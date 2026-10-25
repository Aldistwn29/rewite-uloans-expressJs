import { Router } from "express";
import { createLoanApplication } from "../controller/loan.controller.js";

const router = Router();
router.post('/loans', createLoanApplication);

export default router;