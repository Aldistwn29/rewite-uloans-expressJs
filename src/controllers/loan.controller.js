import { LoanService } from '../services/loan.services.js';

// membuat peminjaman
export const createLoanApplication = async (req, res) => {
  try {
    const { amount, tenor } = req.body;
    const userId = req.user.id;

    const newLoan = await LoanService.createLoan(userId, tenor, amount);

    return res.status(201).location(`/api/v1/loans/${newLoan.id}`).json({
      success: true,
      message: 'Pengajuan pinjaman Uloans berhasil dibuat.',
      data: newLoan,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.status ? 'Client Error' : 'Internal Server Error',
      message: error.message || 'Terjadi kesalahan pada server',
    });
  }
};

// mengambil riwayat peminjaman user
export const getApplicationLoans = async (req, res) => {
  try {
    const userId = req.user.id;
    const userLoans = await LoanService.getUserLoans(userId);

    return res.status(200).json({
      success: true,
      count: userLoans.length,
      data: userLoans,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.status ? 'Client Error' : 'Internal Server Error',
      message: error.message || 'Terjadi kesalahan pada server',
    });
  }
};

// mengambil detail peminjaman
export const getLoanDetails = async (req, res) => {
  try {
    const loanId = Number(req.params.loanId);
    const userId = req.user.id;

    const loan = await LoanService.getLoanDetails(loanId, userId);

    return res.status(200).json({
      success: true,
      data: loan,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.status ? 'Client Error' : 'Internal Server Error',
      message: error.message || 'Terjadi kesalahan pada server',
    });
  }
};

// membatalkan peminjaman
export const cancelApplicationLoans = async (req, res) => {
  try {
    const loanId = Number(req.params.loanId);
    const userId = req.user.id;

    const cancelledLoan = await LoanService.cancelLoan(loanId, userId);

    return res.status(200).json({
      success: true,
      message: 'Pengajuan pinjaman berhasil dibatalkan.',
      data: cancelledLoan,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.status ? 'Client Error' : 'Internal Server Error',
      message: error.message || 'Terjadi kesalahan pada server',
    });
  }
};
