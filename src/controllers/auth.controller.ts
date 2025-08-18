import { Request, Response } from "express";
import { generateToken, generateRefreshToken, verifyRefreshToken } from "../services/auth.services";
import bcrypt from "bcrypt";
import prisma from "../config/database";
import prismaClient from "@prisma/client";


export const signUp = async(req: Request, res: Response) => {

    try {
        
        const {email, password, role} = req.body;

        if(!email || !password || !role){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await prisma.user.findUnique({where: {email}})

        if(user) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const resgisteredUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            }
        })

        console.log(`Avaialble roles : ${prismaClient.Role}`, `Recieved role : ${role}`);

        if(!prismaClient.Role || !Object.values(prismaClient.Role).includes(role)){
            return res.status(400).json({message: "Invalid role"});
        }

        res.status(201).json({
            message: "User created successfully",
            data: resgisteredUser
        })

    }catch(error){
        console.error("Error in signing up", error);
        return res.status(500).json({message: "Internal server error"})    
    }

}

export const signIn = async(req: Request, res: Response) => {
    
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({where: {email}});

    console.log('singin route', user);

    if(!user) {
        return res.status(400).json({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('isMatch', isMatch);

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const token = generateToken(user.id, user.role);
    const refreshToken = await generateRefreshToken(user.id, user.role);

    res.status(200).json({
        message: "User signed in successfully", 
        accessToken : token,
        refreshToken: refreshToken
    });        

} 

export const refreshTokenHandler = async (req: Request, res: Response) => {

    try {

        const {refreshToken} = req.body;

        if (!refreshToken) {
            return res.status(400).json({message: "Refresh token is required"});
        }

        const payload = await verifyRefreshToken(refreshToken);

        if(!payload){
            return res.status(400).json({message: "Invalid refresh token"});
        }

        const accessToken = generateToken(payload.userId, payload.role);

        res.status(200).json({
            message: "Refresh token generated successfully", 
            accessToken : accessToken,
            refreshToken: refreshToken
        });

    }catch(error){
        console.error("Error in creating refresh token" , error);
        return res.status(500).json({message: "Internal server error"})
    }

}

