import express from 'express';
import { deleteToken, generateToken, saveToken } from '../utils/localPersistence';
import UserService from '../services/users';
import { compare } from '../utils/hash';
import { errorMessages, handleError } from '../app/errors';

const router = express.Router();
const userService = new UserService();

router.get('/login', (_, res) => {
    res.send('In Login Page');
})

router.post('/login', async (req, res) => {
    const { email, username, password } = req.body;
    const searchObject = email ? { email } : { name:username };

    try {
        const user = await userService.getBy(searchObject);

        if (!user || !(await compare(password, user.password)))
            return handleError(res, null, errorMessages.invalidCredentials, 401);

        const token = generateToken(searchObject);
        res.json({ token });
    } catch (err) {
        handleError(res, err, errorMessages.serverError);
    }
});

router.post('/logout', (_, res) => {
    deleteToken(res);
    res.status(200).send('logout');
})

export default router;
