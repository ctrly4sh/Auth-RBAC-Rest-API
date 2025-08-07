import prisma from "./config/database";
import app from "./app";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8001;

async function startServer(){

    try {
    
        await prisma.$connect();
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on  http://localhost:${PORT}`);
        })

    }catch(error){
        console.error("Database connection failed", error);
        process.exit(1);
        
    }
}

startServer();
