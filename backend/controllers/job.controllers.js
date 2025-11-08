import Job from '../models/jobs.models.js';
import { createNotification } from './notification.controllers.js';
import User from '../models/users.models.js'; 

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

    // Create the job
    const job = await Job.create({
      client: user._id,
      title,
      description,
      location,
      scheduledAt,
    });

    // 1️⃣ Emit real-time job to city room
    io.to(location).emit('newJob', job);

    // 2️⃣ Fetch all professionals in that city
    const professionals = await User.find({ role: 'professional', city: location });

    // 3️⃣ Create notifications for each professional
    for (const prof of professionals) {
      await createNotification({
        userId: prof._id,
        type: 'newJob',
        message: `A new job has been posted in ${location}: "${title}"`,
        meta: { jobId: job._id, location },
      }, io);
    }

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

    const filter = { status: 'open' };
    if (location) filter.location = location;

    const jobs = await Job.find(filter)
      .populate('client', 'name email')
      .sort({ scheduledAt: 1 });

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
