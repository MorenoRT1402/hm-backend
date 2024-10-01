import express from 'express';
import * as bookingService from '../services/bookings';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, (_, res) => {
    const bookings = bookingService.getAllBookings();
    res.send(bookings);
});

router.get('/:id', authMiddleware, (req, res) => {
    const booking = bookingService.getByID(+req.params.id);
    if (booking) {
        res.status(200).send(booking);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

router.post('/', authMiddleware, (req, res) => {
    const newBooking = bookingService.create(req.body);
    res.status(201).send(newBooking);
});

router.put('/:id', authMiddleware, (req, res) => {
    const updatedBooking = bookingService.update(+req.params.id, req.body);
    if (updatedBooking) {
        res.status(200).send(updatedBooking);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

// Eliminar una reserva existente
router.delete('/:id', authMiddleware, (req, res) => {
    const deleted = bookingService.remove(+req.params.id);
    if (deleted) {
        res.status(204).send(); // 204 es el código de "sin contenido" al eliminar
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

export default router;
