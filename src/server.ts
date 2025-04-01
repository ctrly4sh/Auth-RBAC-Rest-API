import { config } from "dotenv"; config();
import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await prisma.$connect();
        console.log('✅ Neon DB connection successful');

        app.listen(PORT, () => {
            console.log(`🚀 Server listening at http://localhost:${PORT}`);
        });

    } catch (error: any) {
        console.error(`❌ Failed to connect to the database: ${error.message}`);
        process.exit(1); 
    }
}

startServer();