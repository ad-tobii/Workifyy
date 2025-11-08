import express from 'express';
import { createBid } from '../controllers/bids.controller.js';
import protectRoutes from '../middleware/auth.middleware.js';

const router = express.Router();

// Place a bid
router.post('/place-bid', protectRoutes, createBid);

export default router;
