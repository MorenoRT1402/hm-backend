import express from 'express';
import jwt from 'jsonwebtoken';
import { hardcodedUser } from '../app/hardcodedUser';
import { configDotenv } from 'dotenv';
import { deleteToken, saveToken } from '../utils/localPersistence';
import UserService from '../services/users';
import { compare } from '../utils/hash';
configDotenv();

const router = express.Router();
const userService = new UserService();

router.get('/login', (_, res) => {
    res.send('In Login Page');
})

router.post('/login', (req, res) : any => {
    const { username, password } = req.body;

    userService.getBy({name: username}).then(user => {
        if(user === null || !compare(password, user?.password))
            return res.send('Usuario o contraseña incorrectos').status(401);
        
        const token = jwt.sign({ username: hardcodedUser.username }, process.env.TOKEN_SECRET_KEY as string, {
            expiresIn: '1h',
        });
    
        req.headers.authorization = `Bearer ${token}`;
        saveToken(token, res);
        res.json({ token });
    })
});

router.post('/logout', (_, res) => {
    deleteToken(res);
    res.status(200).send('logout');
})

export default router;
