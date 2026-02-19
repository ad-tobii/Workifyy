import mongoose from 'mongoose';

const professionalProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    expertise: {
      type: [String],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    photo: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    reviews: [
      {
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        clientName: {
          type: String,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        review: {
          type: String,
          default: '',
        },
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

professionalProfileSchema.index({ 'location.geo': '2dsphere' });

const ProfessionalProfile = mongoose.model(
  'ProfessionalProfile',
  professionalProfileSchema
);
export default ProfessionalProfile;
