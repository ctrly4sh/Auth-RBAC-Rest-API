import express, {Application, Response} from "express"
import authRouter from "./routes/auth.Routes";
import userRouter from "./routes/user.Routes";

const app: Application = express()

app.use(express.json());

app.get('/ping', (_req, res: Response) => {
    res.status(200).json({message: "pong 🏓"}); 
})

app.use("/auth", authRouter);
app.use("/users", userRouter);

export default app;
