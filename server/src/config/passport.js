import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './db.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: profile.displayName,
                    email,
                    password: '',
                    isVerified: true,
                    googleId: profile.id,
                    picture: profile.photos?.[0]?.value || null,
                },
            });
        } else if (!user.googleId) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { isVerified: true, googleId: profile.id, picture: profile.photos?.[0]?.value || null },
            });
        }

        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

export default passport;
