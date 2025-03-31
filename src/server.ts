import { config } from "dotenv"; config();
import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();
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