import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, (err, user) => {
      if (err) {
        return res.sendStatus(403).send({error: err});
      }
      req.body.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authMiddleware;
