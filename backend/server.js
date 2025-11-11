import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.utils.js';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import http from 'http';
import { Server } from 'socket.io';
import bidRoutes from './routes/bid.routes.js';
import jobRoutes from './routes/job.routes.js';
import notificationRoutes from './routes/notification.routes.js';
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/bid', bidRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use((req, res) => {
  res.send('✅ Workify backend is running successfully! : ⚠️ Route doesnt exist tho.');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH'],
  },
});

io.on('connection', (socket) => {
  // parse cookies from handshake headers
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const token = cookies.jwt;

  if (!token) {
    console.log('Socket couldnt access cookies ⚠️');
    return socket.disconnect();
  }

  // verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log('Socket auth failed:', error.message);
    return socket.disconnect();
  }

  // Store info on sockets
  socket.data.userId = decoded.id || '';
  socket.data.role = decoded.role || '';

  // Client join rooms
  if (socket.data.role === 'client') {
    socket.join(`client:${socket.data.userId}`);
    console.log(`Client ${socket.data.userId} joined their personal room`);
  }
  if (socket.data.role === 'professional') {
    socket.join(`professionals:${socket.data.userId}`);
    console.log(
      `professional:${socket.data.userId} joined their personal room`
    );
  }

  console.log('⚡ Client connected:', socket.id);

  socket.on('joinCity', (city) => {
    socket.join(city);
    console.log(`Client ${socket.id} joined room: ${city}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
