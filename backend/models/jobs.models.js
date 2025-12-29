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
    category: { type: String, required: true },
    budget: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hexId: { type: String, required: true },
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

jobSchema.index({ hexId: 1 }); 
jobSchema.index({ status: 1 });

const Job = mongoose.model('Job', jobSchema);
export default Job;
