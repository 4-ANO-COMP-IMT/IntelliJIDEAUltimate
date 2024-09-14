import { Router } from 'express';
import { createClassification, getClassificationsById } from '../controllers/classificationController'
import { authMiddleware } from '@intelij-ultimate/middleware-utility';
import { allocateImage, getClassifiedImageUrlsAndIds } from '../controllers/allocationController';

const router = Router();


router.post('/classification', authMiddleware, createClassification);
router.get('/classification/:id',  getClassificationsById);


router.post('/allocate', authMiddleware, allocateImage);
router.get('/validation', getClassifiedImageUrlsAndIds); 

export default router;
