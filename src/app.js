import express from 'express';
import loanRoutes from './routes/loan.routes.js';

const app = express();

app.use(express.json());


// loan application route
app.use('/api/v1', loanRoutes);



app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'Uloan API is running',
    });
});


export default app;