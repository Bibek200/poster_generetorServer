import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import authRoutes from '../routes/authRoutes.js';
import dashboardRoutes from '../routes/dashboardRoutes.js';
import posterRoutes from '../routes/posterRoutes.js';
import customerRoutes from '../routes/customerRoutes.js';
import scheduleRoutes from '../routes/scheduleRoutes.js';

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/schedule', scheduleRoutes);


export default app;