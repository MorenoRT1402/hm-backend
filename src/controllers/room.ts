import express from 'express';
import RoomService from '../services/rooms';
import authMiddleware from '../middleware/auth';

const router = express.Router();

const roomService = new RoomService();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API for managing rooms
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     tags: [Rooms]
 *     summary: Retrieve all rooms
 *     description: Get a list of all rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, async (_, res) => {
    const rooms = await roomService.getAll();
    res.send(rooms);
});

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     tags: [Rooms]
 *     summary: Retrieve a room by ID
 *     description: Get a single room by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the room to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single room object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 */
router.get('/:id', authMiddleware, async (req, res) => {
    const room = await roomService.getByID(req.params.id);
    if (room) {
        res.status(200).send(room);
    } else {
        res.status(404).send({ message: 'Room not found' });
    }
});

/**
 * @swagger
 * /rooms:
 *   post:
 *     tags: [Rooms]
 *     summary: Create a new room
 *     description: Create a new room with the provided details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomInput'
 *     responses:
 *       201:
 *         description: The created room object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 */
router.post('/', authMiddleware, async (req, res) => {
    const newRoom = await roomService.create(req.body);
    res.status(201).send(newRoom);
});

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     tags: [Rooms]
 *     summary: Update a room by ID
 *     description: Update the details of an existing room
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the room to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomInput'
 *     responses:
 *       200:
 *         description: The updated room object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 */
router.put('/:id', authMiddleware, async (req, res) => {
    console.log(req.params.id)
    const updateRoom = await roomService.update(req.params.id, req.body);
    console.log(updateRoom);
    if (updateRoom) {
        res.status(200).send(updateRoom);
    } else {
        res.status(404).send({ message: 'Room not found' });
    }
});

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     tags: [Rooms]
 *     summary: Delete a room by ID
 *     description: Remove a room from the database
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the room to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */
router.delete('/:id', authMiddleware, (req, res) => {
    roomService.remove(req.params.id).then(deleted => {
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Room not found' });
        }
    });
});

export default router;
