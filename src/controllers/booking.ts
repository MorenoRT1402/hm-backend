import express from 'express';
import authMiddleware from '../middleware/auth';
import BookingService from '../services/bookings';

const router = express.Router();

const bookingService = new BookingService();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API for managing bookings
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, async (_, res) => {
    const bookings = await bookingService.getAll();
    res.send(bookings);
});

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, (req, res) => {
    const booking = bookingService.getByID(req.params.id);
    if (booking) {
        res.status(200).send(booking);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingInput'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, async (req, res) => {
    const newBooking = await bookingService.create(req.body);
    res.status(201).send(newBooking);
});

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingInput'
 *     responses:
 *       200:
 *         description: Booking updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, (req, res) => {
    const updatedBooking = bookingService.update(req.params.id, req.body);
    if (updatedBooking) {
        res.status(200).send(updatedBooking);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    bookingService.remove(req.params.id).then(deleted => {
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Booking not found' });
        }
    });
});

export default router;
