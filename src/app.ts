import express from 'express';
import cookieParser from 'cookie-parser';
import publicRouter from './controllers/public';
import authRouter from './controllers/auth';
import bookingRouter from './controllers/booking';
import roomRouter from './controllers/room';
import userRouter from './controllers/user';
import contactRouter from './controllers/contact';
import { swaggerSetup } from './documentation/swagger';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Initialize Swagger
swaggerSetup(app);

// Rutas
app.use('/auth', authRouter);
app.use('/bookings', bookingRouter);
app.use('/rooms', roomRouter);
app.use('/users', userRouter);
app.use('/contacts', contactRouter);
app.use('/', publicRouter);

export default app;
