import { LoanRepository } from "../repository/loan.repository.js";


export class loanService {
    static createLoan(userId, tenor, amount){
        if(amount === undefined || tenor === undefined){
            throw {
                status: 400,
                message: 'field amount and tenor wajib diisi'
            };
        }

        if(amount < 500000 || tenor < 3){
            throw {
                status: 422,
                message: 'Jumlah pinjaman minimal 500000 dan tenor minimal 3 bulan'
            };
        }

        return LoanRepository.createLoan({
            userId,
            amount: Number(amount),
            tenor: Number(tenor)
        });
    }

    static getUserLoans(userId){
        return LoanRepository.findAllUserId(userId);
    }

    static getLoanDetails(loanId){
        const loan = LoanRepository.findById(loanId);

        if(!loan){
            throw{
                status: 404,
                message: `Pinjaman dengan ID ${loanId} tidak ditemukan`
            }
        }

        // security
        if(loan.userId !== userId){
            throw{
                status: 403,
                message: 'Anda tidak memiliki hak akses untuk melihat data pinjaman ini.'
            }
        }

        return loan;
    }

    static cancelLoan(loanId, userId){
        const loan = LoanRepository.findById(loanId);

        if(!loan){
            throw{ status: 404, message: `Pinjaman dengan ID ${loanId} tidak ditemukan` };
        }

        if(loan.userId !== userId){
            throw{ status: 403, message: 'Anda tidak memiliki hak akses untuk membatalkan pinjaman ini.'};
        }
        
        if (loan.status !== 'PENDING') {
        throw { status: 422, message: `Pengajuan pinjaman tidak dapat dibatalkan karena status saat ini adalah ${loan.status}.` };
        }

        return LoanRepository.updateLoanStatus(loanId, 'CANCELED');
    }
}