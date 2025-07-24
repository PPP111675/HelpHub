import express from 'express';
import { giveFeedback, getFeedbacks , getMyFeedback} from '../controllers/feedback.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, giveFeedback);
router.get('/', authMiddleware, isAdmin, getFeedbacks);
router.get('/me', authMiddleware, getMyFeedback);

export default router;
