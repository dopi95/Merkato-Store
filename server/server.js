import 'dotenv/config';
import express from 'express';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ status: 'ok', message: 'Merkato API is running' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});
