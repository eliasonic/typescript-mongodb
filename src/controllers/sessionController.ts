import { Request, Response, NextFunction } from 'express'
import { authenticateUser } from '../utils/authenticateUser';
import { Session } from "../models/sessionModel";
import { signJwt } from '../utils/jwt';

export async function createSession (req: Request, res: Response, next: NextFunction) {
    try {
        // Authenticate user
        const user = await authenticateUser(req.body)

        if (!user) {
            res.status(401)
            throw new Error('Invalid email or password')
        }

        // Create session
        const session = await Session.create({ 
            userId: user._id, 
            userAgent: req.get('user-agent') || ''
        })

        // Generate access and refresh tokens
        const payload = { userId: user._id, email: user.email, session: session._id }
        const accessToken = signJwt(payload, '2m')
        const refreshToken = signJwt(payload, '15m')

        // Return tokens
        return res.status(200).json({ accessToken, refreshToken })
    } catch (err) {
        return next(err)
    }
}

export async function getSessions (req: Request, res: Response, next: NextFunction) {
    try {
        const user = res.locals.user

        const sessions = await Session.find({ userId: user.userId, valid: true })

        return res.status(200).json(sessions)
    } catch (err) {
        return next(err)
    }
}

export async function deleteSession (req: Request, res: Response, next: NextFunction) {
    try {
        const user = res.locals.user

        await Session.updateOne({ _id: user.session }, { valid: false })

        return res.status(200).json({
            accessToken: null,
            refreshToken: null
        })
    } catch (err) {
        return next(err)
    }
}

