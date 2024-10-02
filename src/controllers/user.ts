import express from 'express';
import * as userService from '../services/users';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, (_, res) => {
    const users = userService.getAll();
    res.send(users);
});

router.get('/:id', authMiddleware, (req, res) => {
    const user = userService.getByID(+req.params.id);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

router.post('/', authMiddleware, (req, res) => {
    const newuser = userService.create(req.body);
    res.status(201).send(newuser);
});

router.put('/:id', authMiddleware, (req, res) => {
    const updateuser = userService.update(+req.params.id, req.body);
    if (updateuser) {
        res.status(200).send(updateuser);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

router.delete('/:id', authMiddleware, (req, res) => {
    const deleted = userService.remove(+req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

export default router;
