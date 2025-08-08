import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "boogaman69";

export const generateToken = (userId: string, role: string)=> {
    return jwt.sign(
        {userId, role},JWT_SECRET, {expiresIn: "1h", algorithm: "HS256"}
    );
}