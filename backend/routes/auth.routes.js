import express from 'express';
import {
  signup,
  login,
  logout,
  sendVerificationEmail,
  verifyEmail,
  getCurrentUser,
  checkEmail,
} from '../controllers/auth.controllers.js';
import protectRoutes from '../middleware/protectRoutes.middleware.js';
const router = express.Router();

// Signup route
router.post('/signup', signup);
// Login route
router.post('/login', login);
// Logout route
router.post('/logout', logout);
// Send verification mail route
  router.post('/send-verification-mail', protectRoutes, sendVerificationEmail);
// Verify email route
router.post('/verify-email', protectRoutes, verifyEmail);
// Get logged in user
router.get('/get-me', protectRoutes, getCurrentUser);
// Check if email in use
router.get('/check-email', checkEmail);


export default router;
