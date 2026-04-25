import Job from '../models/jobs.models.js';
import Bid from '../models/bids.models.js';
import { createNotification } from './notification.controllers.js';
import ProfessionalProfile from '../models/professionalProfiles.models.js';
import User from '../models/users.models.js';
import { latLngToHex, getJobCoverage } from '../utils/spatial.utils.js';
import mongoose from 'mongoose';

const pickRandomSubmissionImages = (images = [], limit = 2) => {
  const shuffled = [...images]
    .filter(Boolean)
    .sort(() => Math.random() - 0.5);

  return shuffled.slice(0, limit);
};

const syncPortfolioPicturesFromSubmission = async (job) => {
  if (!job?.chosenProfessional || !job?.submission?.images?.length || job.portfolioSyncedAt) {
    return;
  }

  const profile = await ProfessionalProfile.findOne({ user: job.chosenProfessional }).select(
    'portfolioPictures'
  );

  if (!profile) {
    return;
  }

  const existingPictures = new Set(profile.portfolioPictures || []);
  const randomImages = pickRandomSubmissionImages(job.submission.images, 2);
  const imagesToAdd = randomImages.filter((image) => !existingPictures.has(image));

  if (imagesToAdd.length > 0) {
    profile.portfolioPictures = [...(profile.portfolioPictures || []), ...imagesToAdd];
    await profile.save();
  }

  job.portfolioSyncedAt = new Date();
  await job.save();
};

export const createJob = async (req, res) => {
  try {
    const io = req.io;
    const user = req.user;

    if (!user || user.role !== 'client') {
      return res.status(401).json({
        message: 'Unauthorized: Please login as a client to post a job',
        success: false,
        data: null,
      });
    }

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

    const images = req.files ? req.files.map((file) => file.path) : [];
    const hexId = latLngToHex(latitude, longitude);
    const jobCoverage = getJobCoverage(hexId);

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

    io.to(jobCoverage).emit('newJob', job);

    return res.status(201).json({
      message: 'Job successfully posted',
      success: true,
      data: job,
    });
  } catch (error) {
    console.log('Create job error ⚠️:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

export const listJobs = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const user = req.user;

    const hexId = latLngToHex(latitude, longitude);
    const searchArea = getJobCoverage(hexId);

    const openBids = await Bid.find({
      professional: req.user._id,
      status: { $in: ['pending', 'accepted'] },
    }).select('job -_id');

    const jobIds = openBids.map((bid) => bid.job);

    const filter = {
      status: 'open',
      hexId: { $in: searchArea },
      _id: { $nin: jobIds },
      blockedProfessionals: { $nin: [user._id] },
    };

    const jobs = await Job.find(filter)
      .select(
        'title _id budget category hexId status description createdAt scheduledAt address images'
      )
      .populate('client', 'firstname lastname')
      .sort({ createdAt: -1 });

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
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: Please login',
        success: false,
        data: null,
      });
    }

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: 'Invalid job ID',
        success: false,
        data: null,
      });
    }

    let job;

    if (user.role === 'professional') {
      job = await Job.findById(jobId)
        .select(
          'title images client description budget status createdAt updatedAt scheduledAt address submission redoRequest chosenProfessional blockedProfessionals'
        )
        .populate('client', 'firstname lastname');

      if (
        job &&
        job.status === 'open' &&
        job.blockedProfessionals?.includes(user._id)
      ) {
        return res.status(403).json({
          message: 'You are blocked from viewing this job',
          success: false,
          data: null,
        });
      }

      if (
        job &&
        ['ongoing', 'awaiting_review', 'completed'].includes(job.status)
      ) {
        if (job.chosenProfessional?.toString() !== user._id.toString()) {
          return res.status(403).json({
            message: 'You do not have access to this job',
            success: false,
            data: null,
          });
        }
      }
    } else if (user.role === 'client') {
      job = await Job.findById(jobId)
        .select(
          'title images description budget status createdAt updatedAt scheduledAt address submission redoRequest chosenProfessional client'
        )
        .populate('chosenProfessional', 'firstname lastname');

      // Also populate professional profile for client view
      if (job && job.chosenProfessional) {
        const professionalProfile = await ProfessionalProfile.findOne({
          user: job.chosenProfessional._id,
        }).select('photo tagline reviews');

        job = job.toObject();
        job.professionalProfile = professionalProfile;
      }

      if (job && job.client.toString() !== user._id.toString()) {
        return res.status(403).json({
          message: 'You do not have access to this job',
          success: false,
          data: null,
        });
      }
    }

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
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

export const getOngoingJobs = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized: Please login',
        success: false,
        data: null,
      });
    }

    let query;
    let populateField;

    if (user.role === 'professional') {
      query = {
        chosenProfessional: user._id,
        status: 'ongoing',
      };
      populateField = { path: 'client', select: 'firstname lastname' };
    } else if (user.role === 'client') {
      query = {
        client: user._id,
        status: 'ongoing',
      };
      populateField = {
        path: 'chosenProfessional',
        select: 'firstname lastname',
      };
    } else {
      return res.status(401).json({
        message: 'Invalid user role',
        success: false,
        data: null,
      });
    }

    const ongoingJobs = await Job.find(query)
      .select(
        'title description budget category hexId status createdAt scheduledAt address images client chosenProfessional'
      )
      .populate(populateField)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Ongoing jobs fetched successfully',
      success: true,
      data: ongoingJobs,
    });
  } catch (error) {
    console.error('Get ongoing jobs error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

// Submit work (Professional)
export const submitWork = async (req, res) => {
  try {
    const { jobId, message } = req.body;
    const professional = req.user;
    const io = req.io;

    if (!professional || professional.role !== 'professional') {
      return res.status(401).json({
        message: 'Only professionals can submit work',
        success: false,
        data: null,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
        data: null,
      });
    }

    if (job.chosenProfessional?.toString() !== professional._id.toString()) {
      return res.status(403).json({
        message: 'You are not assigned to this job',
        success: false,
        data: null,
      });
    }

    if (job.status !== 'ongoing') {
      return res.status(400).json({
        message: 'Job must be ongoing to submit work',
        success: false,
        data: null,
      });
    }

    const images = req.files ? req.files.map((file) => file.path) : [];

    if (images.length === 0) {
      return res.status(400).json({
        message: 'At least one image is required',
        success: false,
        data: null,
      });
    }

    job.submission = {
      images,
      message: message || '',
      submittedAt: new Date(),
    };
    job.status = 'awaiting_review';
    job.redoRequest = undefined;
    await job.save();

    io.to(`client:${job.client}`).emit('workSubmitted', {
      jobId: job._id,
      jobTitle: job.title,
    });
    await createNotification({
      userId: job.client,
      type: 'workSubmitted',
      message: `Work has been submitted for "${job.title}". Please review.`,
      meta: { jobId: job._id },
    }, io);

    return res.status(200).json({
      message: 'Work submitted successfully',
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Submit work error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

// Accept work and leave review (Client)
export const acceptWork = async (req, res) => {
  try {
    const { jobId, rating, review } = req.body;
    const client = req.user;
    const io = req.io;

    if (!client || client.role !== 'client') {
      return res.status(401).json({
        message: 'Only clients can accept work',
        success: false,
        data: null,
      });
    }

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: 'Invalid job ID',
        success: false,
        data: null,
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'Rating must be between 1 and 5',
        success: false,
        data: null,
      });
    }

    const job = await Job.findOneAndUpdate(
      {
        _id: jobId,
        client: client._id,
        status: 'awaiting_review',
      },
      {
        $set: {
          status: 'completed',
          completedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!job) {
      return res.status(400).json({
        message: 'Job must be awaiting review and belong to you',
        success: false,
        data: null,
      });
    }

    if (!job.chosenProfessional) {
      return res.status(400).json({
        message: 'No professional is assigned to this job',
        success: false,
        data: null,
      });
    }

    await syncPortfolioPicturesFromSubmission(job);

    const reviewCreated = await ProfessionalProfile.findOneAndUpdate(
      {
        user: job.chosenProfessional,
        reviews: { $not: { $elemMatch: { jobId: job._id } } },
      },
      {
        $push: {
          reviews: {
            client: client._id,
            clientName: `${client.firstname} ${client.lastname}`,
            rating,
            review: review || '',
            jobId: job._id,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!reviewCreated) {
      return res.status(409).json({
        message: 'A review has already been submitted for this job',
        success: false,
        data: null,
      });
    }

    io.to(`professional:${job.chosenProfessional}`).emit('workAccepted', {
      jobId: job._id,
      jobTitle: job.title,
      rating,
    });
    await createNotification({
      userId: job.chosenProfessional,
      type: 'workAccepted',
      message: `Your work on "${job.title}" was accepted! You received a ${rating}-star rating.`,
      meta: { jobId: job._id },
    }, io);

    return res.status(200).json({
      message: 'Work accepted successfully',
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Accept work error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

// Request redo (Client)
export const requestRedo = async (req, res) => {
  try {
    const { jobId, message } = req.body;
    const client = req.user;
    const io = req.io;

    if (!client || client.role !== 'client') {
      return res.status(401).json({
        message: 'Only clients can request redo',
        success: false,
        data: null,
      });
    }

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: 'Invalid job ID',
        success: false,
        data: null,
      });
    }

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        message: 'Message is required',
        success: false,
        data: null,
      });
    }

    const normalizedMessage = message.trim();

    const job = await Job.findOneAndUpdate(
      {
        _id: jobId,
        client: client._id,
        status: 'awaiting_review',
      },
      {
        $set: {
          redoRequest: {
            message: normalizedMessage,
            requestedAt: new Date(),
          },
          status: 'ongoing',
        },
        $unset: {
          submission: 1,
        },
      },
      { new: true }
    );

    if (!job) {
      return res.status(409).json({
        message: 'Redo has already been requested or this job is no longer awaiting review',
        success: false,
        data: null,
      });
    }

    io.to(`professional:${job.chosenProfessional}`).emit('redoRequested', {
      jobId: job._id,
      jobTitle: job.title,
      message: normalizedMessage,
    });
    await createNotification({
      userId: job.chosenProfessional,
      type: 'redoRequested',
      message: `Client requested revisions for "${job.title}"`,
      meta: { jobId: job._id },
    }, io);

    return res.status(200).json({
      message: 'Redo requested successfully',
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Request redo error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

// Cancel job (Professional)
export const cancelJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const professional = req.user;
    const io = req.io;

    if (!professional || professional.role !== 'professional') {
      return res.status(401).json({
        message: 'Only professionals can cancel jobs',
        success: false,
        data: null,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
        data: null,
      });
    }

    if (job.chosenProfessional?.toString() !== professional._id.toString()) {
      return res.status(403).json({
        message: 'You are not assigned to this job',
        success: false,
        data: null,
      });
    }

    if (job.status !== 'ongoing') {
      return res.status(400).json({
        message: 'Can only cancel ongoing jobs',
        success: false,
        data: null,
      });
    }

    job.status = 'open';
    job.chosenProfessional = undefined;
    job.submission = undefined;
    job.redoRequest = undefined;
    job.blockedProfessionals = [
      ...(job.blockedProfessionals || []),
      professional._id,
    ];

    await job.save();

    io.to(`client:${job.client}`).emit('jobCancelled', {
      jobId: job._id,
      jobTitle: job.title,
    });
    await createNotification({
      userId: job.client,
      type: 'jobCancelled',
      message: `A professional cancelled "${job.title}"`,
      meta: { jobId: job._id },
    }, io);

    return res.status(200).json({
      message: 'Job cancelled successfully',
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Cancel job error:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};
