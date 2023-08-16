import { NextFunction, Request, Response } from 'express'
import { processToken, processUserInfomation } from '../services/user.js'

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const full_name: string = req.body.full_name;
        const age: number = req.body.age;
        const gender: string = req.body.gender;
        
        const jsonData = await processUserInfomation(username, email, password, full_name, age, gender);
        return res.status(200).json(jsonData);
    } catch (err) {
        next(err)
    }
}

const generateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;

        const data = await processToken(username, password);
        return res.status(200).json(data)   
    } catch (err) {
        next(err)
    }    
}


export default {
    registerUser,
    generateToken
};