import { Router } from 'express';
import { getProfile, updateTagline } from '../controllers/profile.controllers.js';
import protectRoutes from '../middleware/protectRoutes.middleware.js';

const router = Router();

router.get('/', protectRoutes, getProfile);
router.patch('/tagline', protectRoutes, updateTagline);

export default router;
