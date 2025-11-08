import express from 'express';
import protectRoutes from '../middleware/protectRoutes.middleware.js';
import { createBid, handleBidAction } from '../controllers/bid.controllers.js';

const router = express.Router();

// Create a new bid
router.post('/place-bid', protectRoutes, createBid);

// Accept, reject, or counter a bid
router.patch('/:bidId/action', protectRoutes, handleBidAction);

export default router;
