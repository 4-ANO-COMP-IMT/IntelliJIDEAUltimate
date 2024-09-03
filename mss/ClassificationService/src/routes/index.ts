import { Router } from 'express';
import { createClassification, getClassificationById } from '../controllers/classificationController'
import { authMiddleware } from '@intelij-ultimate/middleware-utility';

const router = Router();


router.post('/classification', authMiddleware, createClassification);
router.get('/classification/:id',  getClassificationById);

export default router;
