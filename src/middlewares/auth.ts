import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express'


dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const AuthString = req.headers["authentication"];
    let tokenRegEx: RegExp = /^Bearer (\w+)+/;
    let matches: RegExpMatchArray;
    let token: string;
  
    try {
        if (typeof AuthString === 'string') {
            matches = AuthString.match(tokenRegEx)
        } else {
            matches = AuthString[0].match(tokenRegEx)
        }
        token = matches[1];     
        jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return res.status(401).json({
            status: "error",
            message: "INVALID_TOKEN"
        });
    }
    return next();
};

export default verifyToken;