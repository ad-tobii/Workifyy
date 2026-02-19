import Job from '../models/jobs.models.js';

export const getDashboardData = async (req, res) => {
  const user = req.user;
  try {
    if (user.role === 'client') {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const jobs = await Job.find({
        client: user._id,
        $or: [
          { status: { $ne: 'completed' } },
          { status: 'completed', completedAt: { $gte: oneHourAgo } },
        ],
      })
        .populate('client', 'firstname lastname -_id')
        .sort({ createdAt: -1 });

      console.log('This are the jobs', jobs);
      return res.status(200).json({
        message: 'Jobs fetched successfully',
        success: true,
        data: { jobs },
      });
    }
  } catch (error) {
    console.error('Dashboard data fetching error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};
