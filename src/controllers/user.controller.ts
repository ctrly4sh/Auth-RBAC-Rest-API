import { Request, Response } from "express";
import prisma from "../config/database";

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

export const getUserById = async (req: Request, res: Response) => {

    try {

        const {id} = req.params;

        const user = await prisma.user.findUnique({where: {id}});
        
        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        return res.status(200).json({
            message: "User fetched successfully",
            data: user
        })


    }catch(error){
        return res.status(500).json({message: "Internal server error"})
    }

}

export const updateRole = async (req: Request, res: Response) => {

    const {email, role} = req.body;

    const user = await prisma.user.findUnique({where: {email}});

    if(!user){
        return res.status(400).json({message: "User not found"})
    }

    const updatedUser = await prisma.user.update({
        where: {email},
        data: {role}
    })

    return res.status(200).json({
        message: "User updated successfully",
        data: updatedUser
    })

}

export const deleteUser = async(req: Request, res: Response) => {
    
    try {
        
        const {email} = req.body;
        
        const user = await prisma.user.findUnique({where: {email}});
        
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        const deletedUser = await prisma.user.delete({where: {email}});
        
        return res.status(200).json({
            message: "User Deleted successfully",
            data: deletedUser
        })

    }catch(error){
        return res.status(500).json({message: "Error deleting user"})
    }

}