import express from 'express';
import protectRoutes from '../middleware/protectRoutes.middleware.js';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from '../controllers/notification.controllers.js';

const router = express.Router();

// Get all notifications for logged-in user
router.get('/', protectRoutes, getNotifications);

// Mark a single notification as read
router.patch('/:notificationId/read', protectRoutes, markAsRead);

// Mark all notifications as read
router.patch('/mark-all-read', protectRoutes, markAllAsRead);

export default router;
