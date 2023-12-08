import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Database connected: ${res.connection.host}`)
    } catch (err: any) {
        console.log(`Error: ${err.message}`)
    }
} 

export default connectDB