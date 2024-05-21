import { Request, Response, NextFunction } from 'express'
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://67130aaad87425e043613de867cfd50e@o4507269420482560.ingest.us.sentry.io/4507269718540288",
  tracesSampleRate: 1.0
});

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    const code = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500

    Sentry.captureException(error)
    
    res.status(code)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
}
