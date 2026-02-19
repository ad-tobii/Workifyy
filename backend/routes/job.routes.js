import express from 'express';
import {
  createJob,
  listJobs,
  getJob,
  getOngoingJobs,
  submitWork,
  acceptWork,
  requestRedo,
  cancelJob,
} from '../controllers/job.controllers.js';
import parser from '../utils/multer.utils.js';
import protectRoutes from '../middleware/protectRoutes.middleware.js';

const router = express.Router();

// Create a job
router.post('/post-job', protectRoutes, parser.array('images', 5), createJob);

// Get all open jobs
router.get('/get-jobs', protectRoutes, listJobs);

// Get ongoing jobs
router.get('/ongoing', protectRoutes, getOngoingJobs);

// Get single job (both professional and client can access)
router.get('/:jobId', protectRoutes, getJob);

// Submit work (Professional)
router.post(
  '/submit-work',
  protectRoutes,
  parser.array('images', 10),
  submitWork
);

// Accept work (Client)
router.post('/accept-work', protectRoutes, acceptWork);

// Request redo (Client)
router.post('/request-redo', protectRoutes, requestRedo);

// Cancel job (Professional)
router.post('/cancel-job', protectRoutes, cancelJob);

export default router;
