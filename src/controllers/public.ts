import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (_, res) => {
    res.send('<h1>Hello world!</h1>');
});

router.get('/info', (_, res) => {
    res.sendFile(path.join(__dirname, '../docs/routes.md'));
});

export default router;
