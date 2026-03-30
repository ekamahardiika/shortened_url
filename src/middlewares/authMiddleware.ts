import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '../utils/prisma'
import { NextFunction, Request, Response } from 'express'

interface AuthRequest extends Request {
  user?: any;
}

async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const token = req.cookies.refreshToken

        if(!token){
            throw new Error("NO_TOKEN")
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

        const user = await prisma.user.findUnique({
            where: {
                id: verifyToken.id
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default authMiddleware;