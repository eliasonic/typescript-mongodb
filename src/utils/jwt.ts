import jwt from 'jsonwebtoken'

export function signJwt(payload: object, expiresIn: string) {
    return jwt.sign(payload, 'secret', { expiresIn })
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, 'secret')
        return { decoded, expired: false }
    } catch (err: any) {
        return { decoded: null, expired: err.message.includes('jwt expired') }
    }
}