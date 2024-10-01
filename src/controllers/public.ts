import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (_, res) => {
    res.send('<h1>Hello world!</h1>');
});

router.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, '../docs/routes.md'));
});

export default router;
