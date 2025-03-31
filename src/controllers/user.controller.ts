import { Request, RequestHandler, Response } from "express";
import * as userModel from "../models/user.model"
import HTTP_STATUS from "../utils/httpStatusCodes";
import STATUS_MESSAGES from "../utils/statusMessages";
import { successResponse, errorResponse } from "../utils/responseHandler";

export const getHealth = (req: Request, res: Response) => {
    try{
        successResponse(res, STATUS_MESSAGES.SUCCESS, "Server Health is okay", HTTP_STATUS.OK);
    }catch(error: any){
        errorResponse(res, "Server Health is bad :(", HTTP_STATUS.INTERNAL_SERVER_ERROR, error);
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const {email, password} = req.body;
        let user = await userModel.getUserByEmail(email);

        if(user) {
            errorResponse(res, STATUS_MESSAGES.CONFLICT , HTTP_STATUS.CONFLICT, "User already exists !!" );
            return;
        }
        user = await userModel.createUser(email, password);
        successResponse(res, STATUS_MESSAGES.CREATED, user, HTTP_STATUS.CREATED)
        

    }catch(error){
        errorResponse(res, STATUS_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR, error);
    }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        
        let {page = "1", limit =  "10"} = req.query;

        const pageNumber = Math.max(1 , parseInt(page as string, 10) || 1); 
        const limitNumber = Math.max(1, parseInt(limit as string, 10) || 1);
        const offset = (pageNumber - 1) * limitNumber;

        const users = await userModel.getUsers({offset, limitNumber});
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