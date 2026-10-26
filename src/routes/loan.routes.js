import { Router } from "express";
import { cancelApplicationLoans, createLoanApplication, getApplicationLoans } from "../controller/loan.controller.js";
import { verfiyToken } from "../middleware/auth.middleware.js";

const router = Router();
router.post('/loans', verfiyToken, createLoanApplication);
router.get('/loans', verfiyToken, getApplicationLoans);
router.patch('/loans/:loanId/cancel', verfiyToken, cancelApplicationLoans);

export default router;