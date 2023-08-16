import { NextFunction, Request, Response } from 'express'
import { userData } from '../db/schema.js';
import { db } from '../db/config.server.js';
import { and, eq } from 'drizzle-orm';

const addData = async (userInfo: object, key: string, value: string) => {
    if (!key || typeof key !== 'string' || key.length == 0) {
        return {
            status: "error",
            code: "INVALID_KEY",
            message: "The provided key is not valid or missing."
        };
    }
    
    if (!value || typeof value !== 'string' || value.length == 0) {
        return {
            status: "error",
            code: "INVALID_VALUE",
            message: "The provided value is not valid or missing."
        }
    }

    const userId: number = userInfo['userid']
    const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));

    if (result.length != 0) {
        return {
            status: "error",
            code: "KEY_EXISTS",
            message: "The provided key already exists in the database. To update an existing key, use the update API"
        }
    }

    await db.insert(userData).values({
        userId: userId,
        key: key,
        value: value
    });

    return {
        "status": "success",
        "message": "Data stored successfully."
    }
}

const getDataByKey = async (userInfo: object, key: string) => {    
    if (!key || typeof key !== 'string' || key.length == 0) {
        return {
            status: "error",
            code: "INVALID_KEY",
            message: "The provided key is not valid or missing."
        }
    }
    
    const userId: number = userInfo['userid']
    const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));

    if (result.length == 0) {
        return {
            status: "error",
            code: "KEY_NOT_FOUND",
            message: "The provided key does not exist in the database."
        }
    }
    
    return {
        "status": "success",
        "data": {
            "key": result[0].key,
            "value": result[0].value
        }
    }; 
}

const updateDataByKey = async (userInfo: object, key: string, value: string) => {
    if (!key || typeof key !== 'string' || key.length == 0) {
        return {
            status: "error",
            code: "INVALID_KEY",
            message: "The provided key is not valid or missing."
        }
    }
    
    const userId: number = userInfo['userid']
    const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));

    if (result.length == 0) {
        return {
            status: "error",
            code: "KEY_NOT_FOUND",
            message: "The provided key does not exist in the database."
        }
    }

    await db.update(userData).set({
        value: value
    }).where(
        and(
            eq(userData.userId, userId), 
            eq(userData.key, key)
        )
    )
    
    return {
        "status": "success",
        "message": "Data updated successfully."
    }
}

const deleteDataByKey = async (userInfo: object, key: string) => {
    if (!key || typeof key !== 'string' || key.length == 0) {
        return {
            status: "error",
            code: "INVALID_KEY",
            message: "The provided key is not valid or missing."
        };
    }
    
    const userId: number = userInfo['userid']
    const result = await db.select().from(userData).where(and(eq(userData.userId, userId), eq(userData.key, key)));

    if (result.length == 0) {
        return {
            status: "error",
            code: "KEY_NOT_FOUND",
            message: "The provided key does not exist in the database."
        }
    }

    await db.delete(userData)
        .where(and(
            eq(userData.userId, userId), 
            eq(userData.key, key)
        )
    )
    
    return {
        "status": "success",
        "message": "Data deleted successfully."
    }; 
}


export default {
    addData,
    getDataByKey,
    updateDataByKey,
    deleteDataByKey
}