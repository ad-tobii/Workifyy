import express from 'express';
import { signup, login, logout, sendVerificationEmail, verifyEmail } from '../controllers/auth.controllers.js';
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

export default router;