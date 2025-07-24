import express from 'express';
import { chatWithBot } from '../controllers/chat.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, chatWithBot);

export default router;
