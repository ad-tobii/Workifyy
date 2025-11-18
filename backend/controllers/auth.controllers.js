import User from '../models/users.models.js';
import bcrypt from 'bcrypt';
import sendEmail from '../utils/email.utils.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, password, email, role } = req.body;
    // collect and validate the request body

    const requiredFields = [
      'firstname',
      'lastname',
      'password',
      'email',
      'role',
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `All fields are required: ${missingFields.join(', ')}`,
        success: false,
        data: null,
      });
    }
    // check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User already exists', success: false, data: null });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      firstname,
      lastname,
      password: hashedPassword,
      email,
      role,
    });
    // save the user to the database
    const savedUser = await newUser.save();
    // generate a token
    const token = tokenGenerator(savedUser._id, savedUser.role, res);
    const res_user = {
      _id: savedUser._id,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
      email: savedUser.email,
      role: savedUser.role,
      isVerified: savedUser.isVerified,
    };
    return res.status(201).json({
      message: 'User created successfully',
      success: true,
      data: { user: res_user },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // collect and validate the request body
    const requiredFields = ['email', 'password'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `All fields are required: ${missingFields.join(', ')}`,
        success: false,
        data: null,
      });
    }
    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Username or password is incorrect',
        success: false,
        data: null,
      });
    }
    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Username or password is incorrect',
        success: false,
        data: null,
      });
    }
    const res_user = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
    // generate a token
    const token = tokenGenerator(user._id, user.role, res);
    return res.status(200).json({
      message: 'Login successful',
      success: true,
      data: { user: res_user },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: null,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwt');
    // send response
    return res.status(200).json({
      message: 'Logout successful',
      success: true,
      data: null,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: null,
    });
  }
};

export const sendVerificationEmail = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized - No token provided',
        success: false,
        data: null,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }

    // Check cooldown (30 seconds)
    const COOLDOWN_MS = 30 * 1000;
    if (user.lastOtpSentAt) {
      const timeSinceLastOtp = Date.now() - user.lastOtpSentAt;
      if (timeSinceLastOtp < COOLDOWN_MS) {
        const secondsLeft = Math.ceil((COOLDOWN_MS - timeSinceLastOtp) / 1000);
        return res.status(429).json({
          message: `Please wait ${secondsLeft}s before requesting another OTP`,
          success: false,
          data: { retryAfter: secondsLeft },
        });
      }
    }

    // Generate and hash OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Update user with new OTP
    user.otp = hashedOtp;
    user.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    user.lastOtpSentAt = Date.now();
    await user.save();

    // Send verification email
    const emailText = `Hello and welcome to Workifyy! Your verification OTP is ${otp}. This OTP will expire in 5 minutes.`;
    await sendEmail(user.email, 'Workifyy - Verify your email', emailText);

    return res.status(200).json({
      message: 'Verification email sent successfully',
      success: true,
      data: { expiresIn: 300 }, // seconds
    });
  } catch (error) {
    console.error('Error sending verification email:', error);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token',
        success: false,
        data: null,
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired',
        success: false,
        data: null,
      });
    }

    return res.status(500).json({
      message: 'Failed to send verification email',
      success: false,
      data: null,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    // Retrive token and otp
    const token = req.cookies.jwt;
    const { otp } = req.body;
    // Hash the otp
    const hashedOtp = crypto
      .createHash('sha256')
      .update(otp.toString())
      .digest('hex');

    // Validate the token
    if (!token) {
      return res.status(400).json({
        message: 'Unauthorized',
        success: false,
        data: null,
      });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find and validate the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        message: 'Email already verified',
        success: false,
        data: null,
      });
    }
    // Reset attempt counter every 24 hours
    if (!user.otpAttemptResetAt || Date.now() > user.otpAttemptResetAt) {
      user.otpAttempts = 0;
      user.otpAttemptResetAt = Date.now() + 24 * 60 * 60 * 1000; // reset next day
    }

    // Check daily limit
    if (user.otpAttempts >= 5) {
      return res.status(429).json({
        message: 'Too many OTP attempts today. Try again tomorrow.',
        success: false,
        data: null,
      });
    }

    // Validate the otp expiration
    if (!user.otpExpiresAt || user.otpExpiresAt < Date.now()) {
      // Reset the otp
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();
      return res.status(400).json({
        message: 'OTP expired',
        success: false,
        data: null,
      });
    }
    // Validate the otp
    if (user.otp !== hashedOtp) {
      // Increment the otp attempt counter
      user.otpAttempts += 1;
      await user.save();
      // Send response
      return res.status(400).json({
        message: 'Invalid OTP',
        success: false,
        data: null,
      });
    }
    // save the user
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    // send response
    return res.status(200).json({
      message: 'Email verified successfully',
      success: true,
      data: null,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: null,
    });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email }).lean();

    return res.json({ available: !user });
  } catch (error) {
    console.error('CheckEmail error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

const tokenGenerator = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export const getCurrentUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: 'Not authenticated',
      success: false,
      data: null,
    });
  }

  res.json({
    message: 'User fetched successfully',
    success: true,
    data: { user },
  });
};

// To do list:
// * Add forgot password functionality
// * Add reset password functionality
