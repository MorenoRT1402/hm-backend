import express from 'express';
import path from 'path';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Public routes without authentication
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Display a "Hello World" message
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: A simple Hello World message
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: <h1>Hello world!</h1>
 */
router.get('/', (_, res) => {
    res.send('<h1>Hello world!</h1>');
});

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Serve a markdown documentation file
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Sends the routes documentation markdown file
 *         content:
 *           text/markdown:
 *             schema:
 *               type: string
 *               example: "# API Routes Documentation\n\n## List of Routes..."
 */
router.get('/info', (_, res) => {
    res.sendFile(path.join(__dirname, '../docs/routes.md'));
});

export default router;
