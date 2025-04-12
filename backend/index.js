import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true                // 🔥 allow sending cookies
}));
connectDB();
app.use(cookieParser());

app.use('/auth',authRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});