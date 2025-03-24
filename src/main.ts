import express , {Request, Response} from "express";
const app = express();

app.get('/health' , (req: Request , res: Response) => {
   res.status(200).json({
    success: true,
    Message: "server health is okay"
  })
})

const PORT= process.env.PORT || 8001 ;
app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`)
})
