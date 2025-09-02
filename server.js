import express from  "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDatabase from "./config/database.js";
import apiRoutes from "./routes/routes.js"
import test from "node:test";


const app = express();

app.use(express.json());

app.use(cors("*"));

app.use("/api", apiRoutes);

app.get("/hi", async(req,res)=>{
    res.json({message:"Hi From Backend"})
})

const PORT = process.env.PORT || 5003

const startServer = async()=>{
    try{
        await connectDatabase();
        console.log("Database U Lidh Me Suksess");

        app.listen(PORT, ()=>{
            console.log(`Server Is Running On Port http://localhost:${PORT}`)
        })

    }catch(error){
        console.error("Erro Creating Server", error)

    }
}
startServer();