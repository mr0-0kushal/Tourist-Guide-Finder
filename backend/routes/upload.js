// routes/uploadRoute.js
import express from 'express';
import multer from 'multer';
import { uploadToCloudinary } from '../controllers/uploadController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Use memory storage for in-memory buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/:id', verifyUser, upload.single('file'), uploadToCloudinary);

export default router;
