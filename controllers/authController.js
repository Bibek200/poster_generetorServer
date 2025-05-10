import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existing = await User.findOne({ email });
		if (existing)
			return res.status(400).json({ message: 'Email already exists' });

		const hashed = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashed,
		});

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: '1d',
		});

		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
		});

		res.status(201).json({ message: 'Registration successful', user });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Invalid credentials' });

		const isMatch = bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: '1d',
		});

		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
		});
		res.json({ message: 'Login successful', user });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const profile = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password');
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const logout = (req, res) => {
	res.clearCookie('token').json({ message: 'Logged out successfully' });
};
