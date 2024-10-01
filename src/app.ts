import express from 'express';
import bookingRouter from './controllers/booking';
import publicRouter from './controllers/public';
import authRouter from './controllers/auth';
const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/bookings', bookingRouter);
app.use('/', publicRouter);

export default app;