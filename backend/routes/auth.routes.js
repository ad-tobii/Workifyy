import express from 'express';
import {
  signup,
  login,
  logout,
  sendVerificationEmail,
  verifyEmail,
  getCurrentUser,
} from '../controllers/auth.controllers.js';
import protectRoutes from '../middleware/protectRoutes.middleware.js';
const router = express.Router();

// Signup route
router.post('/signup', signup);
// Login route
router.post('/login', login);
// Logout route
router.post('/logout', logout);
// Send verification email route
router.post('/send-verification-email', sendVerificationEmail);
// Verify email route
router.post('/verify-email', verifyEmail);
// Get logged in user
router.get('/get-me', protectRoutes, getCurrentUser);

export default router;
