import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const user = await User.create(data)  // hash password first

        res.status(201).send({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        })
    } catch (err) {
        return next(err)
    }
}