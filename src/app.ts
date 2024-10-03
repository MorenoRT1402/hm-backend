import express from 'express';
import publicRouter from './controllers/public';
import authRouter from './controllers/auth';
import bookingRouter from './controllers/booking';
import roomRouter from './controllers/room';
import userRouter from './controllers/user';
import contactRouter from './controllers/contact';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/bookings', bookingRouter);
app.use('/rooms', roomRouter);
app.use('/users', userRouter);
app.use('/contacts', contactRouter);
app.use('/', publicRouter);

export default app;