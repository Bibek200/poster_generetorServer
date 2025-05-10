import express from 'express';
import { createSchedule, getScheduleByCustomer } from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/customer/:customerId', getScheduleByCustomer);
router.post('/create', createSchedule);

export default router;


