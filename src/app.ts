import express, {Application, Response} from "express"
import authRouter from "./routes/auth.Routes";
import userRouter from "./routes/user.Routes";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app: Application = express()

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
}));


app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true   
}));

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,
    message : "Too many requests from this IP, please try again after 15 minutes"
})

app.use(rateLimiter);

app.use(express.json());

app.get('/ping', (_req, res: Response) => {
    res.status(200).json({message: "pong 🏓"}); 
})

app.use("/auth", authRouter);
app.use("/users", userRouter);

export default app;
