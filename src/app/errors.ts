import { Response } from "express";

export const errorMessages = {
    invalidCredentials: 'Usuario o contraseña incorrectos',
    serverError: 'Error en el servidor',
}

export const handleError = (res:Response, err:Error|null|unknown, message:string, statusCode = 500) => {
    console.error(message, err);
    res.status(statusCode).send(message);
};