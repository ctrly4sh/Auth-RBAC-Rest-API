import { Router } from "express";
import { getAllUsers, signIn, signUp } from "../controllers/auth.controller"; 
import { authorizeRoles } from "../middlewares/auth.middleware";


const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get('/allUsers', authorizeRoles("ADMIN") ,getAllUsers)

export default authRouter;