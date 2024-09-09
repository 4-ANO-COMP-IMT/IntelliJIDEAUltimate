import { allocateController } from '../controllers/allocateController';
import { selfFullDeallocateController } from '../controllers/deallocateController';
import { login } from '../controllers/loginController';
import { logout } from '../controllers/logoutController';
import { Router } from 'express';

const router = Router();

router.post('/Allocate', allocateController);
router.post('/Deallocate', selfFullDeallocateController);

export default router;
