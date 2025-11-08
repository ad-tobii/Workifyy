import express from 'express';
import { createJob, getJobs } from '../controllers/jobs.controller.js';
import protectRoutes  from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a job 
router.post('/new-job', protectRoutes, createJob);

// Get all open jobs 
router.get('/get-jobs', protectRoutes, getJobs);

export default router;
