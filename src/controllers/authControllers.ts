import { Request, Response } from "express";
import { registerUser, loginUser, getCurrentUser } from "../services/authServices";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

interface AuthRequest extends Request {
  user?: any;
}

async function registerController(req: Request, res: Response){
    try {
        const user = await registerUser(req.body)

        res.status(201).json({
            message: "Register success",
            data: user
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function loginController(req: Request, res: Response){
    try {
        const user = await loginUser(req.body)

        const refreshToken = generateRefreshToken(user.id)

        const accessToken = generateAccessToken(user.id)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        
        res.status(200).json({
            message: "Login success",
            data: user,
            refreshToken: refreshToken,
            accessToken: accessToken
        })
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function logoutController(_req: Request, res: Response){
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            expires: new Date(0)
        })

        res.status(200).json({
            message: "Logout success"
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function userController(req: AuthRequest, res: Response) {
    try {
        const user = await getCurrentUser(req.user);

        const token = req.cookies.refreshToken

        res.status(200).json({
            message: "Current user",
            data: user,
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export { registerController, loginController, logoutController, userController }