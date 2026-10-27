import { LoanRepository } from '../repositories/loan.repository.js';

export class LoanService {
  static async createLoan(userId, tenor, amount) {
    const numericAmount = Number(amount);
    const numericTenor = Number(tenor);

    if (!Number.isFinite(numericAmount) || !Number.isFinite(numericTenor)) {
      throw {
        status: 400,
        message: 'amount dan tenor harus berupa angka',
      };
    }
    if (numericAmount < 500000 || numericTenor < 3) {
      throw {
        status: 422,
        message: 'Jumlah pinjaman minimal 500000 dan tenor minimal 3 bulan',
      };
    }

    return LoanRepository.createLoan({
      userId,
      amount: numericAmount,
      tenor: numericTenor,
    });
  }

  static async getUserLoans(userId) {
    return LoanRepository.findAllByUserId(userId);
  }

  static async getLoanDetails(loanId, userId) {
    const loan = await LoanRepository.findByIdAndUserId(loanId, userId);

    if (!loan) {
      throw {
        status: 404,
        message: 'Pengajuan pinjaman tidak ditemukan',
      };
    }

    return loan;
  }

  static async cancelLoan(loanId, userId) {
    const loan = await LoanRepository.findByIdAndUserId(loanId, userId);

    if (!loan) {
      throw {
        status: 404,
        message: 'Pengajuan pinjaman tidak ditemukan',
      };
    }

    if (loan.status !== 'PENDING') {
      throw {
        status: 422,
        message: `Pengajuan tidak dapat dibatalkan karena status saat ini adalah ${loan.status}.`,
      };
    }

    return LoanRepository.updateLoanStatus(loanId, 'CANCELLED');
  }
}
