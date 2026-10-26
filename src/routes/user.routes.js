import { Router } from 'express';
import { getProfile, updateProfile } from '../controller/user.controller.js';
import { verfiyToken } from '../middleware/auth.middleware.js';

const router = Router();

// profile proteksi
router.get('/user/profile', verfiyToken, getProfile);
router.put('/user/profile', verfiyToken, updateProfile);

export default router;