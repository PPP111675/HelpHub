import express from 'express';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faq.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getFAQs);
router.post('/', authMiddleware, isAdmin, createFAQ);
router.put('/:id', authMiddleware, isAdmin, updateFAQ);
router.delete('/:id', authMiddleware, isAdmin, deleteFAQ);

export default router;
