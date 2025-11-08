import Job from '../models/Jobs.models';

export const createJob = async (req, res, io) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'client') {
      return res.status(401).json({
        message: 'Unauthorized: Please login as a client to post a job',
        success: false,
        data: null,
      });
    }

    const { title, description, location, scheduledAt } = req.body;
    const requiredFields = ['title', 'description', 'location', 'scheduledAt'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Some required fields missing: ${missingFields.join(', ')} `,
        success: false,
        data: null,
      });
    }

    const job = await Job.create({
      client: user._id,
      title,
      description,
      location,
      scheduledAt,
    });

    io.to(job.location).emit('newJob', job);

    return res.status(201).json({
      message: 'Job successfully posted',
      success: true,
      data: job,
    });
  } catch (error) {
    console.log('This is the error ⚠️ : ', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

export const listJobs = async (req, res) => {
  try {
    const { location } = req.query;

    // Build filter: only pending jobs
    const filter = { status: 'pending' };
    if (location) filter.location = location;

    // Fetch jobs from DB
    const jobs = await Job.find(filter)
      .populate('client', 'name email')
      .sort({ scheduledAt: 1 }); // soonest jobs first

    return res.status(200).json({
      message: 'Open jobs fetched successfully',
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error('Job listing error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};
