import { Router } from "express";
import { refreshTokenHandler, signIn, signUp } from "../controllers/auth.controller"; 
import { loginRateLimiter } from "../middlewares/rate.limiter";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", loginRateLimiter,signIn);
authRouter.post("/refresh", refreshTokenHandler)

export default authRouter;