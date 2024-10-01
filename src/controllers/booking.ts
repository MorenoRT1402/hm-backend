import express from 'express';
import * as bookingService from '../services/bookings';

const router = express.Router();

router.get('/', (_, res) => {
    const bookings = bookingService.getAllBookings();
    res.send(bookings);
});

router.get('/:id', (req, res) => {
    const booking = bookingService.getByID(+req.params.id);
    if (booking) {
        res.status(200).send(booking);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

router.post('/', (req, res) => {
    const newBooking = bookingService.create(req.body);
    res.status(201).send(newBooking);
});

router.put('/:id', (req, res) => {
    const updatedBooking = bookingService.update(+req.params.id, req.body);
    if (updatedBooking) {
        res.status(200).send(updatedBooking);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

router.delete('/:id', (req, res) => {
    const deleted = bookingService.remove(+req.params.id);
    if (deleted) {
        res.status(204).send(); // 204 es el código de "sin contenido" al eliminar
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

export default router;
