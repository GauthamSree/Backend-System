import { NextFunction, Request, Response } from 'express'
import services from '../services/data.js'

const postData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.user;
        const key = req.body.key;
        const value = req.body.value;
    
        const result = await services.addData(userInfo, key, value); 
    
        return res.status(200).json(result); 
    } catch (err) {
        next(err)
    }
}

const getDataByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.user;
        const key = req.params.key;
        
        const result = await services.getDataByKey(userInfo, key); 
    
        return res.status(200).json(result); 
    } catch (err) {
        next(err)
    }
}

const updateDataByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.user;
        const key = req.params.key;
        const value = req.body.value;
        
        const result = await services.updateDataByKey(userInfo, key, value); 
    
        return res.status(200).json(result); 
    } catch (err) {
        next(err)
    } 
}

const deleteDataByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.user;
        const key = req.params.key;
        
        const result = await services.deleteDataByKey(userInfo, key); 
    
        return res.status(200).json(result); 
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