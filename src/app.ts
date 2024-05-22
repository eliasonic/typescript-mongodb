import express, { Request, Response } from 'express'
import routes from './routes'
import { deserializeUser } from './middlewares/deserializeUser'
import { errorHandler } from './middlewares/errorMiddleware'
import responseTime from 'response-time'
import { restResponseTimeHistogram } from './utils/metrics'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(deserializeUser)

app.use(responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
        restResponseTimeHistogram.observe({
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode
        }, time * 1000)
    }
}))

routes(app)

app.use(errorHandler)


export default app