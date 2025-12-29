import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.utils.js';
import cookieParser from 'cookie-parser';
import { initializeSocket } from './utils/socket.utils.js';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import http from 'http';
import bidRoutes from './routes/bid.routes.js';
import jobRoutes from './routes/job.routes.js';
import notificationRoutes from './routes/notification.routes.js';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://workifyy-beta.vercel.app'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

connectDB();

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bid', bidRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use((req, res) => {
  res.status(404).json({
    message:
      '✅ Workify backend is running successfully! : ⚠️ Route doesnt exist tho.',
  });
});

const server = http.createServer(app);
const io = initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
