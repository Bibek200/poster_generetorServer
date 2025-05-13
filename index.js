import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import posterRoutes from './routes/posterRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Static file handling (fixing __dirname issue)
const __dirname = path.dirname(new URL(import.meta.url).pathname); // This line replaces __dirname
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/schedule', scheduleRoutes);

// Root Route
app.get('/', (req, res) => res.send('API is running...'));

// Start the Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
  }
};

startServer();
