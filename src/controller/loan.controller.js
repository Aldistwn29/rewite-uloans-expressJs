

export const createLoanApplication = (req, res) => {
    const { amount, tenor } = req.body;

    // validasi for user input
    if(!amount || !tenor){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Field amount and tenor required',
        });
    }
    // simulasi new loan application
    const newLoanId = Math.floor(Math.random() * 1000) + 1;

    // apply RFC for set header and body
    res.setHeader('Location', '/api/v1/loan-applications/${newLoanId}');

    // send status code 201 for success and 400 for bad request
    return res.status(201).json({
        success: true,
        message: 'Loan application created successfully',
        data: {
            id : newLoanId,
            amount: Number(amount),
            tenor: Number(tenor),
            status: 'pending',
        }
    });
};