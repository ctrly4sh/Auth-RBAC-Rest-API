import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prismaClient from "@prisma/client";

interface JWTPayload{
    userId: string;
    role: prismaClient.Role
}

export function authorizeRoles(...roles: prismaClient.Role[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers.authorization;
        
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        
        console.log(`Auth header : ${authHeader}`);
        console.log(`Auth token - JWT : ${token}`);

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

        console.log("Decded : ", decoded);

        req.user = {
            userId: decoded.userId,
            role: decoded.role
        }

        const user = req.user;

        console.log(req.user?.role)

        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden: acess denied" });
        }


        next();
    }
}