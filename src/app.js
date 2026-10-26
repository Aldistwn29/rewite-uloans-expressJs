import express from 'express';
import loanRoutes from './routes/loan.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());

// route
app.use('/api/v1', loanRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);




app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'Uloan API is running',
    });
});


export default app;