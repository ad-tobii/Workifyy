import express from 'express';
import protectRoutes from '../middleware/protectRoutes.middleware.js';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from '../controllers/notification.controllers.js';

const router = express.Router();

router.get('/', protectRoutes, getNotifications);
router.patch('/mark-all-read', protectRoutes, markAllAsRead);
router.patch('/:notificationId/read', protectRoutes, markAsRead);
router.delete('/:notificationId', protectRoutes, deleteNotification);

export default router;
