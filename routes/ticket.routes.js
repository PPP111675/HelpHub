import express from 'express';
import { createTicket, getTickets, getMyTickets ,updateTicketStatus } from '../controllers/ticket.controller.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTicket);
router.get('/', authMiddleware, isAdmin, getTickets);
router.put('/:id', authMiddleware, isAdmin, updateTicketStatus);
router.get('/me', authMiddleware, getMyTickets);

export default router;
