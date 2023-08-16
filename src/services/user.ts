import bcrypt from 'bcrypt';
import { db } from '../db/config.server.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const processToken = async (username: string, password: string) => {
    if (!username || !password) {
        return {
            "status": "error",
            "code": "MISSING_FIELDS",
            "message": "Missing fields. Please provide both username and password."
        }
    }
    
    let result = await db.select().from(users).where(eq(users.username, username))

    if (result.length != 0 && (await bcrypt.compare(password, result[0].password))) {
        const accessToken = jwt.sign({
            userid: result[0].id,
            username: username,
            password: password
        }, 
        process.env.JWT_SECRET_KEY, { 
            expiresIn: '1h' 
        })

        return {
            "status": "success",
            "message": "Access token generated successfully.",
            "data": {
                "access_token": accessToken,
                "expires_in": 3600
            }
        }
    } 

    return {
        "status": "error",
        "code": "INVALID_CREDENTIALS",
        "message": "Invalid credentials. The provided username or password is incorrect."
    };
}

const processUserInfomation = async (username: string, email: string, password: string, full_name: string, age: number, gender: string) => {
    const saltRounds = 10;

    if (!username || !email || !password || !full_name) {
        return {
            "status": "error",
            "code": "INVALID_REQUEST",
            "message": "Invalid request. Please provide all required fields: username, email, password, full_name."
        }
    }     

    if (!gender) {
        return {
            "status": "error",
            "code": "GENDER_REQUIRED",
            "message": "Gender field is required. Please specify the gender (e.g., male, female, non-binary)."
        }
    }

    if (age && age < 0) {
        return {
            "status": "error",
            "code": "INVALID_AGE",
            "message": "Invalid age value. Age must be a positive integer."
        }
    }


    let result = await db.select().from(users).where(eq(users.username, username))
    
    if (result.length != 0) {
        return {
            "status": "error",
            "code": "USERNAME_EXISTS",
            "message": "The provided username is already taken. Please choose a different username"
        }
    }
    
    result = await db.select().from(users).where(eq(users.email, email))
    
    if (result.length != 0) {
        return {
            "status": "error",
            "code": "EMAIL_EXISTS",
            "message": "The provided email is already registered. Please use a different email address."
        }
    }
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)

    const insertedUser = await db.insert(users).values({
        username: username,
        email: email,
        password: hashedPassword,
        fullName: full_name,
        age: age,
        gender: gender
    }).returning({user_id: users.id});

    return {
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
    }
}

export {
    processToken,
    processUserInfomation
}