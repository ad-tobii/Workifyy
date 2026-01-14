import Job from '../models/jobs.models.js';
import { createNotification } from './notification.controllers.js';
import User from '../models/users.models.js';
import { latLngToHex, getJobCoverage } from '../utils/spatial.utils.js';

export const createJob = async (req, res) => {
  try {
    const io = req.io;
    // Ensure user is a client
    const user = req.user;
    if (!user || user.role !== 'client') {
      return res.status(401).json({
        message: 'Unauthorized: Please login as a client to post a job',
        success: false,
        data: null,
      });
    }

    //  Ensure required fields are present
    const {
      title,
      description,
      category,
      address,
      budget,
      scheduledAt,
      longitude,
      latitude,
    } = req.body || {};

    const requiredFields = [
      'title',
      'category',
      'longitude',
      'latitude',
      'budget',
      'address',
      'description',
      'scheduledAt',
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Some required fields missing: ${missingFields.join(', ')} `,
        success: false,
        data: null,
      });
    }

    // collecting job images
    const images = req.files ? req.files.map((file) => file.path) : [];

    // determine the hex id
    const hexId = latLngToHex(latitude, longitude);
    const jobCoverage = getJobCoverage(hexId);

    // Create the job
    const job = await Job.create({
      client: user._id,
      title,
      description,
      budget,
      category,
      hexId,
      address,
      scheduledAt,
      images,
    });

    // Emit real-time job to coverage room
    io.to(jobCoverage).emit('newJob', job);

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
    // Retrieve Longitude and latitude from request
    const { latitude, longitude } = req.query;

    // Determine Hex_id and coverage
    const hexId = latLngToHex(latitude, longitude);
    const searchArea = getJobCoverage(hexId);

    // filter for only open jobs within the search area
    const filter = { status: 'open', hexId: { $in: searchArea } };

    // retrieve matching jobs from db
    const jobs = await Job.find(filter)
      .select(
        'title _id budget category hexId status description createdAt scheduledAt address'
      )
      .populate('client', 'firstname lastname -_id')
      .sort({ createdAt: -1 });

    // send response
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

export const getJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const pro = req.user; // professional trying to access the job

    // Validate professional
    if (!pro || pro.role !== 'professional') {
      return res.status(401).json({
        message: 'Unauthorized: Please login as a professional',
        success: false,
        data: null,
      });
    }

    // Validate jobId
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: 'Invalid job ID',
        success: false,
        data: null,
      });
    }

    // Find job and select fields
    const job = await Job.findById(jobId)
      .select(
        'title images client description budget status createdAt updatedAt scheduledAt'
      )
      .populate('client', 'firstname lastname -_id');

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
        data: null,
      });
    }

    // Ensure job is open
    if (job.status !== 'open') {
      return res.status(400).json({
        message: 'This job is no longer open',
        success: false,
        data: null,
      });
    }

    // Check if pro is blocked
    if (job.blockedProfessionals?.includes(pro._id)) {
      return res.status(403).json({
        message: 'You are blocked from viewing this job',
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      message: 'Job fetched successfully',
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Get job error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};
