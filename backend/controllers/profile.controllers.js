import Bid from '../models/bids.models.js';
import ClientProfile from '../models/clientProfiles.models.js';
import Job from '../models/jobs.models.js';
import ProfessionalProfile from '../models/professionalProfiles.models.js';

const getAccountAge = (createdAt) => {
  const created = new Date(createdAt);
  const diffMs = Date.now() - created.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (days < 1) return 'Joined today';
  if (days < 30) return `${days} day${days === 1 ? '' : 's'}`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'}`;
};

const getCoordinates = (profile) => {
  const coordinates = profile?.location?.geo?.coordinates || profile?.location?.coordinates || [];

  if (coordinates.length !== 2) return null;

  return {
    longitude: Number(coordinates[0]),
    latitude: Number(coordinates[1]),
  };
};

const getRatingSummary = (reviews = []) => {
  if (!reviews.length) {
    return { average: 0, count: 0 };
  }

  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  return {
    average: Number((total / reviews.length).toFixed(1)),
    count: reviews.length,
  };
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    const baseUser = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      memberSince: user.createdAt,
      accountAge: getAccountAge(user.createdAt),
    };

    if (user.role === 'client') {
      const [profile, jobs] = await Promise.all([
        ClientProfile.findOne({ user: user._id }).lean(),
        Job.find({ client: user._id }).select('status budget address createdAt completedAt').lean(),
      ]);

      const completedJobs = jobs.filter((job) => job.status === 'completed');
      const activeJobs = jobs.filter((job) =>
        ['open', 'ongoing', 'awaiting_review'].includes(job.status)
      );
      const spendingTotal = completedJobs.reduce((sum, job) => sum + Number(job.budget || 0), 0);
      const latestAddress = jobs.find((job) => job.address)?.address || null;

      return res.status(200).json({
        message: 'Profile fetched successfully',
        success: true,
        data: {
          role: 'client',
          user: baseUser,
          profile: {
            photo: profile?.photo || '',
            languages: profile?.languages || [],
            location: latestAddress || 'Location on file',
            coordinates: getCoordinates(profile),
          },
          stats: {
            jobsPosted: jobs.length,
            completedJobs: completedJobs.length,
            activeJobs: activeJobs.length,
            spendingTotal,
          },
        },
      });
    }

    if (user.role === 'professional') {
      const [profile, jobs, activeProposals] = await Promise.all([
        ProfessionalProfile.findOne({ user: user._id }).lean(),
        Job.find({ chosenProfessional: user._id })
          .select('status budget title createdAt completedAt')
          .lean(),
        Bid.countDocuments({ professional: user._id, status: 'pending' }),
      ]);

      const completedJobs = jobs.filter((job) => job.status === 'completed');
      const ongoingContracts = jobs.filter((job) =>
        ['ongoing', 'awaiting_review'].includes(job.status)
      );
      const earningsTotal = completedJobs.reduce((sum, job) => sum + Number(job.budget || 0), 0);
      const rating = getRatingSummary(profile?.reviews || []);

      return res.status(200).json({
        message: 'Profile fetched successfully',
        success: true,
        data: {
          role: 'professional',
          user: baseUser,
          profile: {
            photo: profile?.photo || '',
            tagline: profile?.tagline || '',
            experience: profile?.experience || 0,
            expertise: profile?.expertise || [],
            languages: profile?.languages || [],
            bio: profile?.bio || '',
            portfolioPictures: profile?.portfolioPictures || [],
            reviews: profile?.reviews || [],
            coordinates: getCoordinates(profile),
          },
          stats: {
            rating,
            jobsCompleted: completedJobs.length,
            activeProposals,
            ongoingContracts: ongoingContracts.length,
            earningsTotal,
          },
        },
      });
    }

    return res.status(400).json({
      message: 'Invalid user role',
      success: false,
      data: null,
    });
  } catch (error) {
    console.error('Profile fetch error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

export const updateTagline = async (req, res) => {
  try {
    const user = req.user;
    const { tagline } = req.body;
    const nextTagline = `${tagline || ''}`.trim();

    if (user.role !== 'professional') {
      return res.status(403).json({
        message: 'Only professional profiles have editable taglines',
        success: false,
        data: null,
      });
    }

    if (!nextTagline) {
      return res.status(400).json({
        message: 'Tagline is required',
        success: false,
        data: null,
      });
    }

    if (nextTagline.length > 120) {
      return res.status(400).json({
        message: 'Tagline must be 120 characters or fewer',
        success: false,
        data: null,
      });
    }

    const profile = await ProfessionalProfile.findOneAndUpdate(
      { user: user._id },
      { tagline: nextTagline },
      { new: true, runValidators: true }
    ).select('tagline');

    if (!profile) {
      return res.status(404).json({
        message: 'Professional profile not found',
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: 'Tagline updated successfully',
      success: true,
      data: { tagline: profile.tagline },
    });
  } catch (error) {
    console.error('Tagline update error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};
