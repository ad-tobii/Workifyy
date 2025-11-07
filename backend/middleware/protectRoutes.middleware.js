import jwt from 'jsonwebtoken';
import User from '../models/users.models.js';
import dotenv from 'dotenv';
dotenv.config();

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized: No token provided',
        success: false,
        data: null,
      });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: Invalid token',
        success: false,
        data: null,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      message: 'Unauthorized',
      success: false,
      data: null,
    });
  }
};

export default protectRoutes;
