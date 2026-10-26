import { Router } from 'express';
import { getProfile, updateProfile } from '../controller/user.controller.js';
import { verfiyTonken } from '../middleware/auth.middleware.js';

const router = Router();

// profile proteksi
router.get('/user/profile', verfiyTonken, getProfile);
router.put('/user/profile', verfiyTonken, updateProfile);

export default router;