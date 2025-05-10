import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';


export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const verifyCustomer = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.id);

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    req.customer = customer;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};