import express from 'express';
import { createJob, listJobs } from '../controllers/job.controllers.js';
import protectRoutes  from '../middleware/protectRoutes.middleware.js';

const router = express.Router();

// Create a job 
router.post('/post-job', protectRoutes, createJob);

// Get all open jobs 
router.get('/get-jobs', protectRoutes, listJobs);

export default router;
