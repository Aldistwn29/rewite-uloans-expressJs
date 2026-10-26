import { loanService } from "../services/loan.services.js";


// Create Loan
export const createLoanApplication = (req, res) => {
    try {
        const { amount, tenor } = req.body;
        const userId = req.user.id;

        const newLoan = loanService.createLoan(userId, tenor, amount);

        res.setHeader('Location', `/api/v1/loans/${newLoan.id}`);

        return res.status(201).json({
            success:true,
            message: 'Pengajuan pinjaman Uloans berhasil dibuat.',
            data: newLoan
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status ? 'Client Error' : 'Internal server Error',
            message: error.message || 'Terjadi kesalahan pada server'
        });
    }
};

// Get User Loans
export const getApplicationLoans = (req, res) => {
    try {
        const userId = req.user.id;
        const userLoans = loanService.getUserLoans(userId);

        return res.status(200).json({
            success: true,
            count: userLoans.length,
            data: userLoans
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status ? 'Error' : 'Internal Server Error',
            message: error.message
        });
    }
};

// Get loan for details
export const cancelApplicationLoans = (req, res) => {
    try{
        const loanId = Number(req.params.loanId);
        const userId = req.user.id;

        const updatedLoan = loanService.cancelLoan(loanId, userId);

        return res.status(200).json({
            message: 'Pengajuan pinjaman berhasil dibatalkan.',
            data: updatedLoan
        })
    }catch (error) {
        return res.status(error.status || 500).json({
            error: error.status ? 'Error' : 'Internal Server Error',
            message: error.message
        });
    }
}