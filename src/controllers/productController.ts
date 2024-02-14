import { Request, Response, NextFunction } from 'express'
import { Product } from '../models/productModel'

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user
        
        const data = req.body

        if (!data.name || !data.price) {
            res.status(400)
            throw new Error('Provide all product fields')
        }
        
        const product = await Product.create({ userId: user.userId, ...data })

        return res.status(201).json(product)        
    } catch (err) {
        return next(err)
    }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find({})

        if (!products) {
            return res.sendStatus(404)
        }

        return res.status(200).json(products)
    } catch (err) {
        return next(err)
    }
}

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) {
            res.status(404)
            throw new Error(`Cannot find product with ID ${id}`)
        }

        return res.status(200).json(product)
    } catch (err) {
        return next(err)
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user

        const { id } = req.params
        const data = req.body

        const product = await Product.findById(id)

        if (!product) {
            return res.sendStatus(404)
        }

        if (user.userId !== String(product.userId)) {
            return res.sendStatus(403)
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, data)

        return res.status(200).json(updatedProduct)        
    } catch (err) {
        return next(err)
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user

        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) {
            return res.sendStatus(404)
        }

        if (user.userId !== String(product.userId)) {
            return res.sendStatus(403)
        }

        await Product.findByIdAndDelete(id)
        
        return res.sendStatus(200)        
    } catch (err) {
        return next(err)
    }
}

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct }