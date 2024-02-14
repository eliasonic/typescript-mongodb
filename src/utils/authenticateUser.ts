import { User } from "../models/userModel"; 
import { Session } from "../models/sessionModel";
import { signJwt } from "./jwt";

export async function authenticateUser({
    email,
    password
}: {
    email: string;
    password: string;
}) {
    const user = await User.findOne({ email })

    if (!user) {
        return false
    }

    if (password !== user.password) {  // compare with hashed password
        return false
    }

    return user
}

export async function reIssueAccessToken(sessionId: string) {
    // Check if session exists and is valid
    const session = await Session.findById(sessionId)
    
    if (!session || !session.valid) {
        return null
    }

    // Generate new access token
    const user = await User.findById(session.userId)

    if (!user) {
        return null
    }

    const payload = { userId: user._id, email: user.email, session: session._id }

    const newAccessToken = signJwt(payload, '2m')
    
    return newAccessToken
}