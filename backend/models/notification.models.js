import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // recipient
    type: { type: String, required: true }, // 'bidAccepted', 'jobAwarded'
    message: { type: String, required: true },
    meta: { type: Object }, // optional extra info like jobId, bidId
    read: { type: Boolean, default: false }, // has the user seen it
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
