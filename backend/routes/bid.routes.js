import express from 'express';
import protectRoutes from '../middleware/protectRoutes.middleware.js';
import { 
  placeBid, 
  acceptBid, 
  counterBid, 
  rejectBid 
} from '../controllers/bid.controllers.js';

const router = express.Router();

// 1. Place the initial bid
router.post('/place', protectRoutes, placeBid);

// 2. Accept a bid (Professional or Client)
router.patch('/accept', protectRoutes, acceptBid);

// 3. Make a counter-offer
router.patch('/counter', protectRoutes, counterBid);

// 4. Reject or Withdraw a bid
router.patch('/reject', protectRoutes, rejectBid);

export default router;