import { Router } from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';
import { register, login, verifyEmail, resendVerification, forgotPassword, resetPassword, updateProfile, changePassword } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, (req, res) => res.json(req.user));
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/signin?error=google` }),
    (req, res) => {
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
);

export default router;
