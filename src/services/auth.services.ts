import jwt from "jsonwebtoken";
import prisma from "../config/database";

interface JwtPayload {
    userId: string;
    role: string;
    iat?: number;
    exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateToken = (userId: string, role: string) => {
    return jwt.sign({userId, role}, JWT_SECRET, {expiresIn: "15m"})
}

export const generateRefreshToken = async (userId: string, role: string) => {
    const token = jwt.sign({userId, role}, REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
    await prisma.refreshToken.create({
        data: {token, userId}
    })

    return token;
}

export const verifyRefreshToken = async (token: string) => {
    try {
        const payload = jwt.verify(token, REFRESH_TOKEN_SECRET!) as JwtPayload;

        console.log("Payload : ", payload)

        const storedToken = await prisma.refreshToken.findUnique({where: {token}})

        if(!storedToken) return null;

        return payload;
        
    } catch (error) {
        return null;
    }
}
