

const loansDatabase = [];
const loanIdCounter = { value: 1 };

export class LoanRepository {
    static createLoan(loanData){
        const newLoan = {
            id : loanIdCounter.value++,
            ...loanData,
            status: 'PENDING',
            createdAt: new Date().toISOString()
        };
        loansDatabase.push(newLoan);
        return newLoan;
    }

    static findAllUserId(userId){
        return loansDatabase.filter(loan => loan.userId === userId);
    }

    static findById(loanId){
        return loansDatabase.find(loan => loan.id === loanId);
    }

    static updateLoanStatus(loanId, newStatus){
        const loan = this.findById(loanId);
        if(!loan) return null;

        loan.status = newStatus;
        loan.updatedAt = new Date().toISOString();
        return loan;
    }
}