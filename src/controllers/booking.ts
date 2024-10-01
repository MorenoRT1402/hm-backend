import express from 'express';
import * as bookingService from '../services/bookings';

const router = express.Router();

router.get('/', (_, res) => {
    const bookings = bookingService.getAllBookings();
    res.send(bookings);
});

export default router;