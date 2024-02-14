import express from 'express'
import connectDB from './db'
import routes from './routes'
import { deserializeUser } from './middlewares/deserializeUser'
import { errorHandler } from './middlewares/errorMiddleware'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(deserializeUser)

connectDB()
routes(app)

app.use(errorHandler)

export default app