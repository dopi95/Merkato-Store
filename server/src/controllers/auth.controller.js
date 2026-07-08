import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../config/db.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../config/email.js';

const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const signToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export async function register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'All fields are required' });

    if (!PW_REGEX.test(password))
        return res.status(400).json({ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.create({
        data: { name, email, password: hashed, verifyToken, verifyTokenExpiry },
    });

    try {
        await sendVerificationEmail(email, verifyToken);
    } catch (err) {
        console.error('Email send failed:', err.message);
    }
    res.status(201).json({ message: 'Account created. Please verify your email.' });
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    if (!user.isVerified)
        return res.status(403).json({ message: 'Please verify your email first' });

    const token = signToken(user.id, user.role);
    const { password: _, verifyToken, resetToken, verifyTokenExpiry, resetTokenExpiry, ...safeUser } = user;
    res.json({ token, user: safeUser });
}

export async function verifyEmail(req, res) {
    const { token } = req.query;
    const user = await prisma.user.findFirst({
        where: { verifyToken: token, verifyTokenExpiry: { gt: new Date() } },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true, verifyToken: null, verifyTokenExpiry: null },
    });
    res.json({ message: 'Email verified successfully' });
}

export async function resendVerification(req, res) {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.isVerified)
        return res.json({ message: 'If that email exists and is unverified, a new link was sent.' });

    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user.update({
        where: { id: user.id },
        data: { verifyToken, verifyTokenExpiry },
    });

    try {
        await sendVerificationEmail(email, verifyToken);
    } catch (err) {
        console.error('Email send failed:', err.message);
    }
    res.json({ message: 'If that email exists and is unverified, a new link was sent.' });
}

export async function forgotPassword(req, res) {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    // Always respond OK to prevent email enumeration
    if (!user) return res.json({ message: 'If that email exists, a reset link was sent.' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
    });

    try {
        await sendPasswordResetEmail(email, resetToken);
    } catch (err) {
        console.error('Email send failed:', err.message);
    }
    res.json({ message: 'If that email exists, a reset link was sent.' });
}

export async function resetPassword(req, res) {
    const { token, password } = req.body;
    if (!token || !password)
        return res.status(400).json({ message: 'Token and password are required' });

    const user = await prisma.user.findFirst({
        where: { resetToken: token, resetTokenExpiry: { gt: new Date() } },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    if (!PW_REGEX.test(password))
        return res.status(400).json({ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.' });

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed, resetToken: null, resetTokenExpiry: null },
    });
    res.json({ message: 'Password reset successfully' });
}

export async function updateProfile(req, res) {
    const { name, phone, dob, gender } = req.body;
    const updated = await prisma.user.update({
        where: { id: req.user.id },
        data: { name, phone, dob, gender },
        select: { id: true, name: true, email: true, phone: true, dob: true, gender: true, isVerified: true, createdAt: true, picture: true },
    });
    res.json(updated);
}

export async function changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ message: 'Current password is incorrect' });

    if (!PW_REGEX.test(newPassword))
        return res.status(400).json({ message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
    res.json({ message: 'Password changed successfully' });
}
