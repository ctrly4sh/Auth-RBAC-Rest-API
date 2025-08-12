import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller"; 
import { loginRateLimiter } from "../middlewares/rate.limiter";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", loginRateLimiter,signIn);

export default authRouter;