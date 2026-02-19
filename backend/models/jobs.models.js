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
    address: {
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
      enum: ['open', 'ongoing', 'awaiting_review', 'completed', 'cancelled'],
      default: 'open',
    },
    chosenProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    blockedProfessionals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    submission: {
      images: {
        type: [String],
        default: [],
      },
      message: {
        type: String,
        default: '',
      },
      submittedAt: {
        type: Date,
      },
    },
    redoRequest: {
      message: {
        type: String,
        default: '',
      },
      requestedAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

jobSchema.index({ hexId: 1 });
jobSchema.index({ status: 1 });

const Job = mongoose.model('Job', jobSchema);
export default Job;