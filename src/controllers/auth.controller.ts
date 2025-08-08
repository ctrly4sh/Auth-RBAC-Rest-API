import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import prisma from "../config/database";
import prismaClient, { Prisma } from "@prisma/client";


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

    if(!user) {
        return res.status(400).json({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({
        message: "User signed in successfully", 
        Token : token
    });        

} 

export const getAllUsers = async(_req: Request, res: Response) => {

    try {
        
        const users = await prisma.user.findMany();
        
        return res.status(200).json({
            message : "user fetched succesfully",
            data: users,
            count: prisma.user.count()
        })

    }
    catch(error){
        return res.status(500).json({message: "Internal server error"})
    }

}