import express from 'express';
import cookieParser from 'cookie-parser';
import publicRouter from './controllers/public';
import authRouter from './controllers/auth';
import bookingRouter from './controllers/booking';
import roomRouter from './controllers/room';
import userRouter from './controllers/user';
import contactRouter from './controllers/contact';
import { swaggerSetup } from './documentation/swagger';
import cors from 'cors';
import { endpoints } from './app/api';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Initialize Swagger
swaggerSetup(app);

// Rutas
app.use(`/${endpoints.auth}`, authRouter);
app.use(`/${endpoints.booking}`, bookingRouter);
app.use(`/${endpoints.rooms}`, roomRouter);
app.use(`/${endpoints.users}`, userRouter);
app.use(`/${endpoints.contacts}`, contactRouter);
app.use('/', publicRouter);

export default app;
