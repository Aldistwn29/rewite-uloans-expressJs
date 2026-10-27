import prisma from '../lib/prisma.js';

export class LoanRepository {
  static async createLoan(loanData) {
    return prisma.loan.create({
      data: {
        userId: loanData.userId,
        amount: loanData.amount,
        tenor: loanData.tenor,
        status: loanData.status,
      },
    });
  }

  static findByIdAndUserId(loanId, userId) {
    return prisma.loan.findFirst({
      where: {
        id: loanId,
        userId,
      },
    });
  }

  static findAllByUserId(userId) {
    return prisma.loan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static updateLoanStatus(loanId, newStatus) {
    return prisma.loan.update({
      where: { id: loanId },
      data: {
        status: newStatus,
      },
    });
  }
}
