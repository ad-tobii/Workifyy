import Job from '../models/jobs.models.js';

export const getDashboardData = async (req, res) => {
  const user = req.user;
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    if (user.role === 'client') {
      const jobs = await Job.find({
        client: user._id,
        $or: [
          { status: { $ne: 'completed' } },
          { status: 'completed', completedAt: { $gte: oneHourAgo } },
        ],
      })
        .populate('client', 'firstname lastname -_id')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: 'Jobs fetched successfully',
        success: true,
        data: { jobs },
      });
    }

    if (user.role === 'professional') {
      const jobs = await Job.find({
        chosenProfessional: user._id,
        $or: [
          { status: { $ne: 'completed' } },
          { status: 'completed', completedAt: { $gte: oneHourAgo } },
        ],
      })
        .populate('client', 'firstname lastname -_id')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: 'Jobs fetched successfully',
        success: true,
        data: { jobs },
      });
    }

    return res.status(400).json({
      message: 'Invalid user role',
      success: false,
      data: null,
    });
  } catch (error) {
    console.error('Dashboard data fetching error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};
