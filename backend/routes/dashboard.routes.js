import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controllers.js';
import protectRoutes from '../middleware/protectRoutes.middleware.js';

const router = Router();

// Routes for the dashboard
router.get('/', protectRoutes, getDashboardData);
export default router;
