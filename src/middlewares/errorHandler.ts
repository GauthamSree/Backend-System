import { NextFunction, Request, Response } from "express";

const ErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred. Please try again later.',
    })
}

export default ErrorHandler;