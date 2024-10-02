import express from 'express';
import * as roomService from '../services/rooms';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, (_, res) => {
    const rooms = roomService.getAll();
    res.send(rooms);
});

router.get('/:id', authMiddleware, (req, res) => {
    const room = roomService.getByID(+req.params.id);
    if (room) {
        res.status(200).send(room);
    } else {
        res.status(404).send({ message: 'Room not found' });
    }
});

router.post('/', authMiddleware, (req, res) => {
    const newRoom = roomService.create(req.body);
    res.status(201).send(newRoom);
});

router.put('/:id', authMiddleware, (req, res) => {
    const updateRoom = roomService.update(+req.params.id, req.body);
    if (updateRoom) {
        res.status(200).send(updateRoom);
    } else {
        res.status(404).send({ message: 'Room not found' });
    }
});

router.delete('/:id', authMiddleware, (req, res) => {
    const deleted = roomService.remove(+req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Room not found' });
    }
});

export default router;
