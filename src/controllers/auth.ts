import express from 'express';
import jwt from 'jsonwebtoken';
import { hardcodedUser } from '../app/hardcodedUser';
import { configDotenv } from 'dotenv';
configDotenv();

const router = express.Router();

router.get('/', (_, res) => {
    res.send('In Login Page');
})

router.post('/', (req, res) : any => {
    const { username, password } = req.body;

    const user = username === hardcodedUser.username;
    //crypt later
    const isMatch = password === hardcodedUser.password;
    if (!user || !isMatch) {
        return res.send('Usuario o contraseña incorrectos').status(401);
    }

    const token = jwt.sign({ username: hardcodedUser.username }, process.env.TOKEN_SECRET_KEY as string, {
        expiresIn: '1h',
    });

    req.headers.authorization = `Bearer ${token}`;
    res.json({ token });
});

export default router;
