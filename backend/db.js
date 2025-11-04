import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB', err);
    });
};

export default connectDB;
