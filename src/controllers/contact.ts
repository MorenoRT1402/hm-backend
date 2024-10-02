import express from 'express';
import * as contactService from '../services/contacts';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, (_, res) => {
    const contacts = contactService.getAll();
    res.send(contacts);
});

router.get('/:id', authMiddleware, (req, res) => {
    const contact = contactService.getByID(+req.params.id);
    if (contact) {
        res.status(200).send(contact);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

router.post('/', authMiddleware, (req, res) => {
    const newcontact = contactService.create(req.body);
    res.status(201).send(newcontact);
});

router.put('/:id', authMiddleware, (req, res) => {
    const updatecontact = contactService.update(+req.params.id, req.body);
    if (updatecontact) {
        res.status(200).send(updatecontact);
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

router.delete('/:id', authMiddleware, (req, res) => {
    const deleted = contactService.remove(+req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Booking not found' });
    }
});

export default router;
