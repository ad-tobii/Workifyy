import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['professional', 'client'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    lastOtpSentAt: { type: Date, default: null },
    otpAttempts: { type: Number, default: 0 },
    otpAttemptResetAt: { type: Date, default: null },
    
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
