import { Request, Response } from 'express'

const registerUser = (req: Request, res: Response) => {
    console.log(`Req: ${req}`)
    return res.status(200).json({
        "status": "success",
        "message": "User successfully registered!",
    })
}


export default {
    registerUser
};