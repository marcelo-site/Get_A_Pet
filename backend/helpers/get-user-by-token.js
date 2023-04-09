import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

// get user token
export const getUserByToken = async (token) => {
    if(!token) return resizeBy.status(401).json({ message: 'Acesso negado!' })
    const decoded = jwt.verify(token, 'nosso-secret')

    const userId = decoded.id

    const user = await User.findOne({_id: userId})

    return user
}