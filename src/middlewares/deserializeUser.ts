import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'
import { reIssueAccessToken } from '../utils/authenticateUser'

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve tokens
        const bearerToken = req.headers['authorization']

        if (bearerToken === undefined) {
            return next()
        }

        const accessToken = bearerToken.replace(/^Bearer\s/, '')

        const refreshToken = req.headers['x-refresh']

        if (!accessToken) {
            return next()
        }

        const { decoded, expired } = verifyJwt(accessToken)

        // For a valid access token
        if (decoded) {
            res.locals.user = decoded
            return next()
        }

        // Expired but valid refresh token
        const { decoded: refresh } = expired && refreshToken ? verifyJwt(refreshToken as string) : { decoded: null }

        if (!refresh) {
            return next()
        }

        // @ts-ignore
        const newAccessToken = await reIssueAccessToken(refresh.session)

        if (!newAccessToken) {
            return next()
        }

        res.setHeader('x-access-token', newAccessToken)

        res.locals.user = verifyJwt(newAccessToken).decoded

        return next()
    } catch (err) {
        
    }
}    