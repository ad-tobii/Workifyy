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
      state: {
        type: String,
        required: true,
      },
      geo: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        },
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
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

professionalProfileSchema.index({ 'location.geo': '2dsphere' });

const ProfessionaProfile = mongoose.model(
  'ProfessionalProfile',
  professionalProfileSchema
);
export default ProfessionaProfile;
