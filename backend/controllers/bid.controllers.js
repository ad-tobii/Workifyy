import Bid from '../models/bids.models.js';
import Job from '../models/jobs.models.js';
import { createNotification } from './notification.controllers.js';

export const createBid = async (req, res, io) => {
  try {
    const professional = req.user;

    if (!professional || professional.role !== 'professional') {
      return res.status(401).json({
        message: 'Unauthorized: Only professionals can place bids',
        success: false,
        data: null,
      });
    }

    const { jobId, amount, message } = req.body;
    const requiredFields = ['jobId', 'amount'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing fields: ${missingFields.join(', ')}`,
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

    const bid = await Bid.create({
      professional: professional._id,
      job: jobId,
      amount,
      message: message || '',
      status: 'pending',
    });

    // 1️⃣ Emit real-time bid to client
    io.to(`client:${job.client}`).emit('newBid', bid);

    // 2️⃣ Create persistent notification for client
    await createNotification(
      {
        userId: job.client,
        type: 'newBid',
        message: `You received a new bid from ${professional.name} for "${job.title}"`,
        meta: { jobId: job._id, bidId: bid._id },
      },
      io
    );

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

export const handleBidAction = async (req, res, io) => {
  try {
    const user = req.user;
    const { bidId } = req.params;
    const { action, amount } = req.body;

    if (!['accept', 'reject', 'counter'].includes(action)) {
      return res.status(400).json({
        message: 'Invalid action. Must be accept, reject, or counter.',
        success: false,
        data: null,
      });
    }

    const bid = await Bid.findById(bidId).populate('job');
    if (!bid) {
      return res.status(404).json({
        message: 'Bid not found',
        success: false,
        data: null,
      });
    }

    const job = bid.job;

    if (
      user.role === 'client' &&
      job.client.toString() !== user._id.toString()
    ) {
      return res.status(403).json({
        message: 'Unauthorized: You are not the owner of this job',
        success: false,
        data: null,
      });
    }

    if (
      user.role === 'professional' &&
      bid.professional.toString() !== user._id.toString()
    ) {
      return res.status(403).json({
        message: 'Unauthorized: You are not the owner of this bid',
        success: false,
        data: null,
      });
    }

    // Accept bid
    if (action === 'accept') {
      if (user.role !== 'client') {
        return res
          .status(403)
          .json({
            message: 'Only the client can accept a bid',
            success: false,
            data: null,
          });
      }

      bid.status = 'accepted';
      await bid.save();

      job.status = 'awarded';
      await job.save();

      io.to(`professional:${bid.professional}`).emit('bidUpdated', bid);

      await createNotification(
        {
          userId: bid.professional,
          type: 'bidAccepted',
          message: `Your bid on "${job.title}" was accepted!`,
          meta: { bidId: bid._id, jobId: job._id },
        },
        io
      );

      return res
        .status(200)
        .json({
          message: 'Bid accepted and job awarded',
          success: true,
          data: bid,
        });
    }

    // Reject bid
    if (action === 'reject') {
      if (user.role !== 'client') {
        return res
          .status(403)
          .json({
            message: 'Only the client can reject a bid',
            success: false,
            data: null,
          });
      }

      bid.status = 'rejected';
      await bid.save();

      io.to(`professional:${bid.professional}`).emit('bidUpdated', bid);

      await createNotification(
        {
          userId: bid.professional,
          type: 'bidRejected',
          message: `Your bid on "${job.title}" was rejected.`,
          meta: { bidId: bid._id, jobId: job._id },
        },
        io
      );

      return res
        .status(200)
        .json({ message: 'Bid rejected', success: true, data: bid });
    }

    // Counter bid
    if (action === 'counter') {
      if (!amount || typeof amount !== 'number') {
        return res
          .status(400)
          .json({
            message: 'Counter offer must include a numeric amount',
            success: false,
            data: null,
          });
      }

      bid.status = 'countered';
      bid.counterOffer = amount;
      await bid.save();

      let notifyUserId;
      if (user.role === 'client') notifyUserId = bid.professional;
      else if (user.role === 'professional') notifyUserId = job.client;

      io.to(`user:${notifyUserId}`).emit('bidUpdated', bid);

      await createNotification(
        {
          userId: notifyUserId,
          type: 'bidCounter',
          message: `You received a counter offer for "${job.title}": ${amount}`,
          meta: { bidId: bid._id, jobId: job._id },
        },
        io
      );

      return res
        .status(200)
        .json({ message: 'Counter offer sent', success: true, data: bid });
    }
  } catch (error) {
    console.log('Error in handleBidAction ⚠️:', error.message);
    return res
      .status(500)
      .json({ message: 'Server error', success: false, data: null });
  }
};
