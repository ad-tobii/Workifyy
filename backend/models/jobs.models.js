import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'awarded', 'in-progress', 'completed', 'cancelled'],
      default: 'open',
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
