import express from 'express';
import  createProfile  from '../controllers/onboarding.controllers.js';
import protectRoutes from '../middleware/protectRoutes.middleware.js';

const router = express.Router();
    
// routes

router.post('/create-profile', protectRoutes, createProfile);

export default router;