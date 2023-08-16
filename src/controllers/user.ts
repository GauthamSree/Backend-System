import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { db } from '../db/config.server.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const full_name: string = req.body.full_name;
    const age: number = req.body.age;
    const gender: string = req.body.gender;
    const saltRounds = 10;

    const hashedPassword: string = await bcrypt.hash(password, saltRounds)

    let result = await db.select().from(users).where(eq(users.username, username))
    if (result.length != 0) {
        return res.status(200).json({
            "status": "error",
            "code": "USERNAME_EXISTS",
            "message": "The provided username is already taken. Please choose a different username"
        })
    }

    result = await db.select().from(users).where(eq(users.email, email))
    if (result.length != 0) {
        return res.status(200).json({
            "status": "error",
            "code": "EMAIL_EXISTS",
            "message": "The provided email is already registered. Please use a different email address."
        })
    }

    const insertedUser = await db.insert(users).values({
        username: username,
        email: email,
        password: hashedPassword,
        fullName: full_name,
        age: age,
        gender: gender
    }).returning({user_id: users.id});

    return res.status(200).json({
        "status": "success",
        "message": "User successfully registered!",
        "data": {
            "user_id": insertedUser[0].user_id.toString(),
            "username": username,
            "email": email,
            "full_name": full_name,
            "age": age,
            "gender": gender
          }
    })
}

const generateToken = async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    let result = await db.select().from(users).where(eq(users.username, username))

    if (result.length != 0 && (await bcrypt.compare(password, result[0].password))) {
        const accessToken = jwt.sign({
            username: username,
            password: password
        }, 
        process.env.JWT_SECRET_KEY, { 
            expiresIn: '1h' 
        })
    
        return res.status(200).json({
            "status": "success",
            "message": "Access token generated successfully.",
            "data": {
              "access_token": accessToken,
              "expires_in": 3600
            }
        })
    } 

    return res.status(200).json({
        "status": "error",
        "code": "INVALID_CREDENTIALS",
        "message": "Invalid credentials. The provided username or password is incorrect."
    })      
}


export default {
    registerUser,
    generateToken
};