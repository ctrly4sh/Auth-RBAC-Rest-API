import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user.routes";

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/user', userRouter);
app.use((req, res) => {
    res.status(404).send({message: `Internal Server error ${req.originalUrl} - not found`})
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`${error.stack}`);
    res.status(500).send({message: "Internal server error"});
});

export default app;