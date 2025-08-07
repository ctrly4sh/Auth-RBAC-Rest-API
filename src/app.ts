import express, {Application, Response} from "express"

const app: Application = express()

app.use(express.json());

app.get('/ping', (_req, res: Response) => {
    res.status(200).json({message: "pong 🏓"}); 
})

export default app;
