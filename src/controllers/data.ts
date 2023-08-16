import { NextFunction, Request, Response } from 'express'
import { userData } from '../db/schema.js';
import { db } from '../db/config.server.js';
import { and, eq } from 'drizzle-orm';

const postData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body.user;
        const key = req.body.key;
        const value = req.body.value;
    
        if (!key || typeof key !== 'string' || key.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "INVALID_KEY",
                message: "The provided key is not valid or missing."
            });
        }
        
        if (!value || typeof value !== 'string' || value.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "INVALID_VALUE",
                message: "The provided value is not valid or missing."
            });
        }
    
        const userId: number = userInfo['userid']
        const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));
    
        if (result.length != 0) {
            return res.status(200).json({
                status: "error",
                code: "KEY_EXISTS",
                message: "The provided key already exists in the database. To update an existing key, use the update API"
            }); 
        }
    
        await db.insert(userData).values({
            userId: userId,
            key: key,
            value: value
        });
    
        return res.status(200).json({
            "status": "success",
            "message": "Data stored successfully."
        }); 
    } catch (err) {
        next(err)
    }
}

const getDataByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body.user;
        const key = req.params.key;
    
        if (!key || typeof key !== 'string' || key.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "INVALID_KEY",
                message: "The provided key is not valid or missing."
            });
        }
        
        const userId: number = userInfo['userid']
        const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));
    
        if (result.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "KEY_NOT_FOUND",
                message: "The provided key does not exist in the database."
            }); 
        }
        
        return res.status(200).json({
            "status": "success",
            "data": {
              "key": result[0].key,
              "value": result[0].value
            }
        }); 
    } catch (err) {
        next(err)
    }
}

const updateDataByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body.user;
        const key = req.params.key;
        const value = req.body.value;
    
        if (!key || typeof key !== 'string' || key.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "INVALID_KEY",
                message: "The provided key is not valid or missing."
            });
        }
        
        const userId: number = userInfo['userid']
        const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));
    
        if (result.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "KEY_NOT_FOUND",
                message: "The provided key does not exist in the database."
            }); 
        }
    
        await db.update(userData).set({
            value: value
        }).where(
            and(
                eq(userData.userId, userId), 
                eq(userData.key, key)
            )
        )
        
        return res.status(200).json({
            "status": "success",
            "message": "Data updated successfully."
        });
    } catch (err) {
        next(err)
    } 
}

const deleteDataByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body.user;
        const key = req.params.key;
    
        if (!key || typeof key !== 'string' || key.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "INVALID_KEY",
                message: "The provided key is not valid or missing."
            });
        }
        
        const userId: number = userInfo['userid']
        const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));
    
        if (result.length == 0) {
            return res.status(200).json({
                status: "error",
                code: "KEY_NOT_FOUND",
                message: "The provided key does not exist in the database."
            }); 
        }
    
        await db.delete(userData)
            .where(and(
                eq(userData.userId, userId), 
                eq(userData.key, key)
            )
        )
        
        return res.status(200).json({
            "status": "success",
            "message": "Data deleted successfully."
        }); 
    } catch (err) {
        next(err)
    }
}


export default {
    postData,
    getDataByKey,
    updateDataByKey,
    deleteDataByKey
}