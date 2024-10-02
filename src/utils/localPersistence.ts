import { Request, Response } from "express";

const tokenKey = 'hm-b-t';

export const saveToken = (token:string, res:Response):void => {
    res.cookie(tokenKey, token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
    });
}

export const getToken = (req:Request):string|null => req.cookies[tokenKey];
