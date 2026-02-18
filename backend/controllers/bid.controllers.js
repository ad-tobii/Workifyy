import Bid from '../models/bids.models.js';
import Job from '../models/jobs.models.js';
import { createNotification } from './notification.controllers.js';
import ProfessionalProfile from '../models/professionalProfiles.models.js';

export const placeBid = async (req, res) => {
  try {
    const professional = req.user;
    const io = req.io;

    if (!professional || professional.role !== 'professional') {
      return res
        .status(401)
        .json({ message: 'Only professionals can place bids' });
    }

    const { jobId, amount, message } = req.body || {};

    //  findOne check with Blocklist
    const job = await Job.findOne({
      _id: jobId,
      status: 'open',
      blockedProfessionals: { $ne: professional._id },
    });

    if (!job) {
      return res
        .status(404)
        .json({ message: 'Job unavailable or you are ineligible' });
    }

    //  Prevent duplicate bids
    const existingBid = await Bid.findOne({
      professional: professional._id,
      status: 'pending',
      job: jobId,
    });
    if (existingBid) {
      return res
        .status(400)
        .json({ message: "You've already bid on this job" });
    }

    const professionalProfile = await ProfessionalProfile.findOne({
      user: professional._id,
    });
    if (!professionalProfile) {
      return res
        .status(404)
        .json({ message: 'Professional profile not found' });
    }
    // Create Bid with initial history
    const bid = await Bid.create({
      professional: professional._id,
      job: jobId,
      client: job.client,
      currentAmount: amount,
      professionalProfile: professionalProfile._id,
      awaitingResponseFrom: 'client',
      negotiationHistory: [
        {
          offeredBy: professional._id,
          amount: amount,
          message: message || 'Initial bid placed',
        },
      ],
    });

    // Populate bid for socket emission (same as getClientBids)
    const populatedBid = await Bid.findById(bid._id)
      .populate({
        path: 'job',
        select: 'title budget',
      })
      .populate({
        path: 'professional',
        select: 'firstname lastname',
      })
      .populate({
        path: 'professionalProfile',
        select: 'tagline photo experience expertise languages bio',
      })
      .select(
        'job professional professionalProfile status awaitingResponseFrom currentAmount negotiationHistory'
      );

    // Real-time & Persistent Notification
    io.to(`client:${job.client}`).emit('newBid', populatedBid);
    await createNotification(
      {
        userId: job.client,
        type: 'newBid',
        message: `New bid for "${job.title}"`,
        meta: { jobId, bidId: bid._id },
      },
      io
    );

    const data = {
      _id: bid._id,
      professional: bid.professional,
      client: bid.client,
      jobTitle: job.title,
      negotiationHistory: bid.negotiationHistory,
      awaitingResponseFrom: bid.awaitingResponseFrom,
      status: bid.status,
      currentAmount: bid.currentAmount.toLocaleString(),
      message: bid.message,
    };

    return res.status(201).json({ success: true, data });
  } catch (error) {
    console.log('Error creating bid ⚠️:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const acceptBid = async (req, res) => {
  try {
    const { bidId } = req.body || {};
    const { io, user } = req;

    const bid = await Bid.findById(bidId).populate('job');

    if (!bidId || !bid) {
      return res.status(404).json({
        message: 'Bid does not exist',
        success: false,
        data: null,
      });
    }

    // Ensure only correct users can accept the bid
    const isProfessional = bid.professional.toString() === user._id.toString();
    const isClient = bid.job.client.toString() === user._id.toString();

    if (!isClient && !isProfessional) {
      return res.status(401).json({
        message: 'Not authorized to accept this bid',
        success: false,
        data: null,
      });
    }

    // Ensure user can accept only if it's their turn
    if (bid.awaitingResponseFrom !== user.role) {
      return res.status(401).json({
        message: 'It is not your turn to accept this offer',
        success: false,
        data: null,
      });
    }
    if (bid.job.status !== 'open') {
      return res.status(400).json({
        message: 'job is not open for bidding',
        success: false,
        data: null,
      });
    }

    // update bid status
    bid.status = 'accepted';
    await bid.save();

    // update job status
    await Job.findByIdAndUpdate(bid.job._id, {
      status: 'ongoing',
      chosenProfessional: bid.professional,
    });

    // Populate bid before emitting
    const populatedBid = await Bid.findById(bid._id)
      .populate({
        path: 'job',
        select: 'title budget',
      })
      .populate({
        path: 'professional',
        select: 'firstname lastname',
      })
      .populate({
        path: 'professionalProfile',
        select: 'tagline photo experience expertise languages bio',
      })
      .select(
        'job professional professionalProfile status awaitingResponseFrom currentAmount negotiationHistory'
      );

    user.role === 'professional'
      ? io.to(`client:${bid.job.client}`).emit('bidAccepted', populatedBid)
      : io
          .to(`professional:${bid.professional}`)
          .emit('bidAccepted', populatedBid);

    return res.status(200).json({
      message: 'Bid accepted succesfully',
      success: true,
      data: null,
    });
  } catch (error) {
    console.log('Error accepting bid ⚠️:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

export const counterBid = async (req, res) => {
  try {
    const { io, user } = req;
    const { bidId, offer, message } = req.body || {};

    const bid = await Bid.findById(bidId).populate('job');
    if (!bid || !bidId) {
      return res.status(404).json({
        message: 'Bid does not exist',
        success: false,
        data: null,
      });
    }

    if (bid.job.status !== 'open') {
      return res.status(400).json({
        message: 'job is not open for bidding',
        success: false,
        data: null,
      });
    }

    const isProfessional = bid.professional.toString() === user._id.toString();
    const isClient = bid.job.client.toString() === user._id.toString();

    if (!isClient && !isProfessional) {
      return res.status(401).json({
        message: 'Not authorized to make an offer',
        success: false,
        data: null,
      });
    }

    if (user.role !== bid.awaitingResponseFrom) {
      return res.status(401).json({
        message: 'It is not your turn to make a counter offer',
        success: false,
        data: null,
      });
    }

    if (!offer) {
      return res.status(404).json({
        message: 'Invalid offer',
        success: false,
        data: null,
      });
    }

    bid.currentAmount = offer;
    bid.negotiationHistory.push({
      offeredBy: user._id,
      amount: offer,
      message: message || '',
    });
    bid.awaitingResponseFrom =
      user.role === 'professional' ? 'client' : 'professional';
    await bid.save();

    // Populate bid before emitting
    const populatedBid = await Bid.findById(bid._id)
      .populate({
        path: 'job',
        select: 'title budget',
      })
      .populate({
        path: 'professional',
        select: 'firstname lastname',
      })
      .populate({
        path: 'professionalProfile',
        select: 'tagline photo experience expertise languages bio',
      })
      .select(
        'job professional professionalProfile status awaitingResponseFrom currentAmount negotiationHistory'
      );

    // Real time notification
    const targetRoom =
      user.role === 'professional'
        ? `client:${bid.job.client}`
        : `professional:${bid.professional}`;

    io.to(targetRoom).emit('counterOffer', populatedBid);

    return res.status(200).json({
      message: 'counter offer made !',
      success: true,
      data: bid,
    });
  } catch (error) {
    console.log('Error making counter offer ⚠️:', error.message);
    return res.status(500).json({
      message: 'Server error',
      success: false,
      data: null,
    });
  }
};

export const rejectBid = async (req, res) => {
  try {
    const { io, user } = req;
    const { reason, bidId } = req.body || {};

    // 1. Validation
    const bid = await Bid.findById(bidId).populate('job');
    if (!bidId || !bid) {
      return res.status(404).json({ message: 'Bid not found', success: false });
    }

    const isClient = bid.job.client.toString() === user._id.toString();
    const isProfessional = bid.professional.toString() === user._id.toString();

    // Safety Check: Is it your turn to act on this bid?
    if (bid.awaitingResponseFrom !== user.role) {
      return res
        .status(400)
        .json({ message: "It's not your turn to cancel/reject this bid." });
    }

    // client rejection
    if (isClient) {
      if (!reason) {
        return res
          .status(400)
          .json({ message: 'Please provide a reason for rejection.' });
      }

      bid.status = 'rejected';

      // If "bad fit", use $addToSet to prevent duplicates in the blocked list
      if (reason === 'fit') {
        await Job.findByIdAndUpdate(bid.job._id, {
          $addToSet: { blockedProfessionals: bid.professional },
        });
      }

      await bid.save();

      // Notify Professional
      io.to(`professional:${bid.professional}`).emit('bidRejected', {
        bidId: bid._id,
        jobId: bid.job._id,
        reason:
          reason === 'fit' ? 'Not a match for this project' : 'Price mismatch',
      });
    }

    // PROFESSIONAL
    else if (isProfessional) {
      bid.status = 'withdrawn';
      await bid.save();

      // Notify Client
      io.to(`client:${bid.job.client}`).emit('bidWithdrawn', {
        bidId: bid._id,
        jobId: bid.job._id,
        message: 'The professional has withdrawn their bid.',
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized action' });
    }

    return res.status(200).json({
      message: isClient ? 'Bid rejected' : 'Bid withdrawn',
      success: true,
    });
  } catch (error) {
    console.log('Error rejecting bid ⚠️:', error.message);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

export const getProfessionalBids = async (req, res) => {
  try {
    const professional = req.user;

    // 1. Auth + Role check
    if (!professional || professional.role !== 'professional') {
      return res.status(401).json({
        success: false,
        message: 'Only professionals can access bids',
      });
    }

    // 2. Fetch bids
    const bids = await Bid.find({
      professional: professional._id,
      status: 'pending',
    })
      .populate({
        path: 'job',
        select: 'title',
      })
      .select(
        'job awaitingResponseFrom status currentAmount negotiationHistory'
      )
      .sort({ updatedAt: -1 });

    // 3. Shape response (important)
    const formattedBids = bids.map((bid) => {
      const lastMessage =
        bid.negotiationHistory?.length > 0
          ? bid.negotiationHistory[bid.negotiationHistory.length - 1].message
          : '';

      return {
        _id: bid._id,
        jobTitle: bid.job?.title || 'Unknown Job',
        awaitingResponseFrom: bid.awaitingResponseFrom,
        status: bid.status,
        currentAmount: bid.currentAmount,
        message: lastMessage,
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedBids,
    });
  } catch (error) {
    console.log('Error fetching professional bids ⚠️:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const getClientBids = async (req, res) => {
  try {
    const client = req.user;
    if (!client || client.role !== 'client') {
      return res.status(401).json({
        success: false,
        message: 'Only clients can access bids',
      });
    }

    const bids = await Bid.find({
      client: client._id,
      status: 'pending',
    })
      .populate({
        path: 'job',
        select: 'title budget',
      })
      .populate({
        path: 'professional',
        select: 'firstname lastname',
      })
      .populate({
        path: 'professionalProfile',
        select: 'tagline photo experience expertise languages bio',
      })
      .select(
        'job professional professionalProfile status awaitingResponseFrom currentAmount negotiationHistory'
      )
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.log('Error fetching client bids ⚠️:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// To do:
// 1. make all other bids default to rejected once a bid is accepted on a job.
// 2. create persistent Notifications for all bid events
