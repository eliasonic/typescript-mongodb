import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const code = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500
    //console.log(code)
    
    res.status(code)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
