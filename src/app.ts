import express from 'express';
import bookingRouter from './controllers/booking';
const app = express();

app.get('/', (_, res) => {
    res.send('<h1>Hello world!</h1>');
})

app.use('/bookings', bookingRouter);

export default app;