import Notification from '../models/notification.models.js';


export const createNotification = async ({ userId, type, message, meta = {} }, io) => {
  try {
    // 1️⃣ Persist notification
    const notification = await Notification.create({
      user: userId,
      type,
      message,
      meta,
    });

    // 2️⃣ Emit real-time via socket.io if user online
    io.to(`user:${userId}`).emit('newNotification', notification);

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error.message);
    throw new Error('Could not create notification');
  }
};

/**
 * Get all notifications for logged-in user
 */

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

/**
 * Mark a single notification as read
 */
export const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error('Error marking notification read:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} notifications marked as read`,
    });
  } catch (error) {
    console.error('Error marking all notifications read:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
