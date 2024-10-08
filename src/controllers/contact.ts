import express from 'express';
import authMiddleware from '../middleware/auth';
import ContactService from '../services/contacts';

const router = express.Router();

const contactService = new ContactService();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, (_, res) => {
    const contacts = contactService.getAll();
    res.send(contacts);
});

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, (req, res) => {
    const contact = contactService.getByID(+req.params.id);
    if (contact) {
        res.status(200).send(contact);
    } else {
        res.status(404).send({ message: 'Contact not found' });
    }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, (req, res) => {
    const newContact = contactService.create(req.body);
    res.status(201).send(newContact);
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Contact updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, (req, res) => {
    const updatedContact = contactService.update(+req.params.id, req.body);
    if (updatedContact) {
        res.status(200).send(updatedContact);
    } else {
        res.status(404).send({ message: 'Contact not found' });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, (req, res) => {
    contactService.remove(+req.params.id).then(deleted => {
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Contact not found' });
        }
    });
});

export default router;
