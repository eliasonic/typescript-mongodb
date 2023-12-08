import { Request, Response } from "express";
import User from "../models/user.model";

export const get = async (req: Request, res: Response) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (err: any) {
        res.status(500).json({ error: err.message})
    }
}
 