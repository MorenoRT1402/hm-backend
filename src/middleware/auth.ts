import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  // const token = getToken(req);


  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, (err, user) => {
      if (err) {
        console.error(err)
        return res.status(403).json({ error: err });
      }
      req.body.user = user;
      next();
    });
    
  } else {
    res.sendStatus(401);
  }
};

export default authMiddleware;
