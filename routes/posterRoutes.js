import express from 'express';
import multer from 'multer';
// import path from 'path';
import { uploadPoster, getPostersByCategoryWithCustomer,downloadCustomizedPoster } from '../controllers/posterController.js';
import { loadCustomer } from "../middlewares/loadCustomer.js";
// import { verifyCustomer } from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), uploadPoster);
router.get('/:category/:customerId',loadCustomer, getPostersByCategoryWithCustomer);


router.get('/download/:posterId',  downloadCustomizedPoster);

export default router;