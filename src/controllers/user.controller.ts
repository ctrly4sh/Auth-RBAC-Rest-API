import { Request, Response } from "express";
import * as UserModel from "../models/user.model"

export const createUser = async (req: Request, res: Response) => {
    try {
        
        const {email, password} = req.body;
        const user = await UserModel.createUser(email, password)
        res.status(201).send({message: "User created successfully", data: user});

    }catch(error){
        res.status(201).send({message: "Error creating user"})
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {

        const users = await UserModel.getUsers();
        res.status(201).send({message: "User fetched successfully", data: users})

    }catch(error){
        res.status(201).send({message: "Error fetching users"})
    }
}


