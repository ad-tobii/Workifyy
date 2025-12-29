import { Server } from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import redis from './redisClient.js';
import { latLngToHex } from './spatialUtils.js';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://workifyy-beta.vercel.app'],
      methods: ['GET', 'POST', 'PATCH'],
    },
  });

  // --- MIDDLEWARE: Auth before connection ---
  io.use((socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const token = cookies.jwt;

    if (!token) return next(new Error('Authentication error'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.userId = decoded.id;
      socket.data.role = decoded.role;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  // --- CONNECTION LOGIC ---
  io.on('connection', (socket) => {
    const { userId, role } = socket.data;
    console.log(`⚡ ${role} connected: ${userId}`);

    // Join personal room
    socket.join(`${role}:${userId}`);

    socket.on('update-location', async (coords) => {
      if (role !== 'professional') return;

      const { latitude, longitude } = coords;
      const currentHex = latLngToHex(latitude, longitude);
      const redisKey = `prof:location:${userId}`;

      // Get the previous hex from Redis
      const previousHex = await redis.get(redisKey);

      // IF IT'S THE FIRST TIME (No previousHex in Redis)
      if (!previousHex) {
        socket.join(currentHex);
        await redis.set(redisKey, currentHex, { EX: 300 });
        console.log(
          `📍 Initial Location Set: Pro ${userId} joined ${currentHex}`
        );
        return;
      }

      // IF THEY MOVED (The Swapping Logic)
      if (currentHex !== previousHex) {
        await socket.leave(previousHex);
        await socket.join(currentHex);
        await redis.set(redisKey, currentHex, { EX: 300 });
        console.log(`🏃 Pro ${userId} moved: ${previousHex} -> ${currentHex}`);
      } else {
        // Just keep the session alive
        await redis.expire(redisKey, 300);
      }
    });

    socket.on('disconnect', async () => {
      if (role === 'professional') {
        await redis.del(`prof:location:${userId}`);
      }
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
