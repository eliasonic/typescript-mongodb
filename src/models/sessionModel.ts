import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        userAgent: {
            type: String,
        },
        valid: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const Session = mongoose.model('Session', sessionSchema)

export { Session }