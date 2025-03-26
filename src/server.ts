import express, {Request, Response} from "express";
import { config } from "dotenv"; config();
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user.routes"

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get('/health', (req: Request, res: Response) => {
    res.status(201).send({message: "Server Health okay 🚀"})
});

app.use('/user', userRouter);

const PORT = process.env.PORT || 3001;

async function startServer() {
    try{

        await prisma.$connect();
        console.log('Neon DB connection successfull');

        app.listen(PORT, () => {
            console.log(`Server listening at locahost:${PORT}`);
        })

    }catch(error){
        console.error(`❌Failed to connect to the databse: ${error}`)
    }
}

startServer()