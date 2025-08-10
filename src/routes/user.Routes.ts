import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateRole } from "../controllers/user.controller";
import { authorizeRoles } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/allUsers", authorizeRoles("ADMIN"), getAllUsers);
userRouter.get('/user/:id', authorizeRoles("ADMIN"),getUserById);
userRouter.put('/updateRole', authorizeRoles("ADMIN"), updateRole);
userRouter.delete('/delete', authorizeRoles("ADMIN"), deleteUser)


export default userRouter;
