import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export async function protect(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Not authenticated' });

    try {
        const { id, role } = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, phone: true, dob: true, gender: true, role: true, isVerified: true, createdAt: true, picture: true },
        });
        if (!req.user) return res.status(401).json({ message: 'User not found' });
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}

export function requireAdmin(req, res, next) {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ message: 'Forbidden' });
    next();
}
