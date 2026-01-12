import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The "Current" state of the bid
    currentAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
    message: String,
    // Track who needs to respond next
    awaitingResponseFrom: {
      type: String,
      enum: ['client', 'professional'],
      required: true,
    },
    // The history of the negotiation
    negotiationHistory: [
      {
        offeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: Number,
        message: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
