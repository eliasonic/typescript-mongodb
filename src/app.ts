import express from 'express'
import connectDB from './db'
import routes from './routes'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

connectDB()
routes(app)

export default app