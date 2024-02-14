import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'please enter name']
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema) 

export { Product }