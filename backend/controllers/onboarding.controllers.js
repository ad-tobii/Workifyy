import ProfessionalProfile from '../models/professionalProfiles.models.js';
import ClientProfile from '../models/clientProfiles.models.js';

const createProfile = async (req, res) => {
  try {
    const user = req.user;

    // Check authentication
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: User not found',
        success: false,
        data: null,
      });
    }

    // Handle PROFESSIONAL profile creation
    if (user.role === 'professional') {
      const { tagline, experience, location, expertise, languages, bio } =
        req.body;

      let parsedLocation;
      try {
        parsedLocation =
          typeof location === 'string' ? JSON.parse(location) : location;
      } catch (error) {
        return res.status(400).json({
          message: 'Invalid location format',
          success: false,
          data: null,
        });
      }

      console.log('This is the parsedLocation: ', parsedLocation);
      const { latitude, longitude } = parsedLocation;
      if (!latitude || !longitude) {
        return res.status(400).json({
          message: 'Location is required',
          success: false,
          data: null,
        });
      }

      const userLocation = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      const photo = req?.file?.path || null;
      if (!photo) {
        return res.status(400).json({
          message: 'Photo is required',
          success: false,
          data: null,
        });
      }
      const requiredFields = [
        'tagline',
        'experience',

        'expertise',
        'languages',
        'bio',
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `All fields are required: ${missingFields.join(', ')}`,
          success: false,
          data: null,
        });
      }

      const existingProfile = await ProfessionalProfile.findOne({
        user: user._id,
      });
      if (existingProfile) {
        return res.status(400).json({
          message: 'Professional profile already exists',
          success: false,
          data: null,
        });
      }

      const newProfessionalProfile = new ProfessionalProfile({
        user: user._id,
        tagline,
        experience,
        expertise,
        location: userLocation,
        languages,
        photo,
        bio,
      });

      const savedProfessionalProfile = await newProfessionalProfile.save();

      return res.status(201).json({
        message: 'Professional profile created successfully',
        success: true,
        data: savedProfessionalProfile,
      });
    }

    // Handle CLIENT profile creation
    else if (user.role === 'client') {
      const { photo, state, languages } = req.body;

      const requiredFields = ['photo', 'state', 'languages'];
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `All fields are required: ${missingFields.join(', ')}`,
          success: false,
          data: null,
        });
      }

      const existingClientProfile = await ClientProfile.findOne({
        user: user._id,
      });
      if (existingClientProfile) {
        return res.status(400).json({
          message: 'Client profile already exists',
          success: false,
          data: null,
        });
      }

      const newClientProfile = new ClientProfile({
        user: user._id,
        photo,
        location: { state },
        languages,
      });

      const savedClientProfile = await newClientProfile.save();

      return res.status(201).json({
        message: 'Client profile created successfully',
        success: true,
        data: savedClientProfile,
      });
    }

    // If role is neither professional nor client
    else {
      return res.status(400).json({
        message: 'Invalid user role',
        success: false,
        data: null,
      });
    }
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: null,
    });
  }
};
export default createProfile;
