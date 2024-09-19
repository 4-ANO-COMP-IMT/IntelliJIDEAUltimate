import { login } from '../controllers/loginController';
import { logout } from '../controllers/logoutController';
import { Router } from 'express';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;
