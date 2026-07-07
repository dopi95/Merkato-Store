import 'dotenv/config';
import express from 'express';
import { connectDB } from './src/config/db.js';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
});
