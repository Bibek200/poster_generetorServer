import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import dashboardRoutes from './routes/dashboardRoutes.js';
import posterRoutes from './routes/posterRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());

// app.use('/', (req, res) => {
// 	res.send('API is running...');
// });

app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/schedule', scheduleRoutes);

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
