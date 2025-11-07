import mongoose from 'mongoose';

const clientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photo: {
      type: String,
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
    languages: {
      type: [String],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

clientProfileSchema.index({ 'location.geo': '2dsphere' });

const ClientProfile = mongoose.model('ClientProfile', clientProfileSchema);
export default ClientProfile;
