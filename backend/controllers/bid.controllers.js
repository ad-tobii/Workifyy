import Bid from '../models/Bid.models.js';
import Job from '../models/Jobs.models.js';

export const createBid = async (req, res, io) => {
  try {
    const professional = req.user;

    // Only professionals can place bids
    if (!professional || professional.role !== 'professional') {
      return res.status(401).json({
        message: 'Unauthorized: Only professionals can place bids',
        success: false,
        data: null,
      });
    }

    const { jobId, amount, message } = req.body;
    const requiredFields = ['jobId', 'amount'];

    // Check required fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing fields: ${missingFields.join(', ')}`,
        success: false,
        data: null,
      });
    }

    // Check that job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
        data: null,
      });
    }

    // Check for existing pending bid
    const existingBid = await Bid.findOne({
      professional: professional._id,
      job: jobId,
      status: 'pending',
    });

    if (existingBid) {
      return res.status(400).json({
        message: 'You already have a pending bid for this job',
        success: false,
        data: null,
      });
    }

    // Create bid
    const bid = await Bid.create({
      professional: professional._id,
      job: jobId,
      amount,
      message: message || '',
      status: 'pending',
    });

    // Notify client via Socket.IO
    io.to(`client:${job.client}`).emit('newBid', bid);

    return res.status(201).json({
      message: 'Bid successfully placed',
      success: true,
      data: bid,
    });
  } catch (error) {
    console.log('Error creating bid ⚠️:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};
