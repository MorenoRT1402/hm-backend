import { configDotenv } from "dotenv";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
configDotenv();

const tokenKey = 'hm-b-t';

export const generateToken = (payload:{}) => jwt.sign(payload, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '24h' });

export const saveToken = (token:string, res:Response):void => {
    res.cookie(tokenKey, token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
    });
}

export const getToken = (req:Request):string|null => req.cookies[tokenKey];

export const deleteToken = (res:Response) => {
    res.clearCookie(tokenKey, {
    httpOnly: true,
    sameSite: 'strict',
  });
}