import { Request, Response } from "express";
import * as userModel from "../models/user.model"
import HTTP_STATUS from "../utils/httpStatusCodes";
import STATUS_MESSAGES from "../utils/statusMessages";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const getHealth = (req: Request, res: Response): Response | undefined => {

    try{
         const result = successResponse(res, STATUS_MESSAGES.SUCCESS, "Server Health is okay", HTTP_STATUS.OK) 
         return   

    }catch(error: any){
        return errorResponse(res, "Server Health is bad :(", HTTP_STATUS.INTERNAL_SERVER_ERROR, error) 
    }

}

export const createUser = async (req: Request, res: Response) => {
    try {
        
        const {email, password} = req.body;
        const user = await userModel.createUser(email, password)
        res.status(201).send({message: "User created successfully", data: user});

    }catch(error){
        res.status(401).send({message: "Error creating user"})
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {

        const users = await userModel.getUsers();
        res.status(201).send({message: "User fetched successfully", data: users})

    }catch(error){
        res.status(401).send({message: "Error fetching users"})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try{

        const id = req.params.id;
        const user = await userModel.getUserById(id);
        res.status(201).send({message: "User fetched successfully", data: user})

    }catch(error){
        res.status(401).send({message: "Error getting user"})
    }
}

export const updateUserById = async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        const data = req.body;
        const userBeforeUpdate = await userModel.getUserById(id);
        const updatedUser = await userModel.updateUserById(id, data);
        res.status(201).send({message: "User updated successfully", userBeforeUpdate: userBeforeUpdate, updatedUser: updatedUser}) 

    }catch(error){
        console.log("Error in updating user", error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {

        const id = req.params.id
        const userToDelete = await userModel.getUserById(id);        
        const deletedUser = await userModel.deleteUser(id);
        res.status(201).send({message: "User deletes successfully", userDeleted: userToDelete, data: deletedUser})

    }catch(error : any){
        console.error("Error deleting user", error.message)
    }
}