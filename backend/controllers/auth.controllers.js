import User from '../models/users.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, password, email, role } = req.body;
    // collect and validate the request body
    if (!firstName || !lastName || !password || !email || !role) {
      return res.status(400).json({
        message: 'All fields are required',
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
      firstName,
      lastName,
      password: hashedPassword,
      email,
      role,
    });
    // save the user to the database
    const savedUser = await newUser.save();
    // generate a token
    const token = tokenGenerator(savedUser._id, savedUser.role, res);
    return res.status(201).json({
      message: 'User created successfully',
      success: true,
      data: { user: savedUser, token },
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
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
        data: null,
      });
    }
    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
        success: false,
        data: null,
      });
    }
    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid password',
        success: false,
        data: null,
      });
    }
    // generate a token
    const token = tokenGenerator(user._id, user.role, res);
    return res.status(200).json({
      message: 'Login successful',
      success: true,
      data: { user: user, token },
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

// To do list:
// 1. Send verification email to the user
