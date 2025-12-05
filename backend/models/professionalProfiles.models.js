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
        type: String, // must be "Point"
        enum: ['Point'],
        required: true,
        default: 'Point', // optional
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
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
   
  },
  { timestamps: true }
);

professionalProfileSchema.index({ 'location.geo': '2dsphere' });

const ProfessionaProfile = mongoose.model(
  'ProfessionalProfile',
  professionalProfileSchema
);
export default ProfessionaProfile;
