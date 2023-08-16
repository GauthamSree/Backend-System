import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, NextFunction, Response } from 'express'

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const AuthString = req.headers['authorization'];
    let tokenRegEx: RegExp = /^Bearer ([\w-]*\.[\w-]*\.[\w-]*)+/;
    try {
        const matches = AuthString.match(tokenRegEx)
        const token = matches[1];
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            status: "error",
            message: "INVALID_TOKEN"
        });
    }
    return next();
};

export default verifyToken;