import app from "./app";
import http from 'http'
import { startMetricsServer } from "./utils/metrics";
import connectDB from "./db";

const port = process.env.PORT || 3001

const server = http.createServer(app)

server.listen(port, async () => {
    console.log(`Server is started on port ${port}`)

    await connectDB()

    startMetricsServer()
})