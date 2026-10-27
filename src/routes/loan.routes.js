import {
  cancelApplicationLoans,
  createLoanApplication,
  getApplicationLoans,
  getLoanDetails,
} from '../controllers/loan.controller.js';
import { Router } from 'express';
import { verfiyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/loans', verfiyToken, createLoanApplication);
router.get('/loans', verfiyToken, getApplicationLoans);
router.get('/loans/:loanId', verfiyToken, getLoanDetails);
router.post('/loans/:loanId/cancellation', verfiyToken, cancelApplicationLoans);

export default router;
