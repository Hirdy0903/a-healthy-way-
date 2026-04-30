import express from 'express';
import { createLog, getLogs } from '../controllers/logController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createLog).get(protect, getLogs);

export default router;
