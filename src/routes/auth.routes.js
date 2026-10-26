import { Router } from 'express';
import { login, registrasi } from '../controller/auth.controller.js';

const router = Router();

router.post('/auth/register', registrasi);
router.post('/auth/login', login);

export default router;