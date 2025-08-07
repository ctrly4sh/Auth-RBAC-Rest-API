import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "boogaman69";

export const generateToken = (userId: string, role: string)=> {
    return jwt.sign(
        //payload
        {userId, role},
        //secret
        JWT_SECRET, 
        //options
        {expiresIn: "1h"}
    );
}