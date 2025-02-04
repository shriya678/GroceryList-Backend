import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import groceryItemRoutes from "./routes/groceryItemRoutes.js"
import cors from "cors";


const dbUrl = process.env.MONGODB_URI;
// Enable CORS
app.use(
    cors({
      origin: ["http://localhost:5173","https://grocery-list-frontend.vercel.app"], // React app ka URL
    })
  );

main().then(()=>{
    console.log("connected to server");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(dbUrl,{useNewUrlParser:true});
}

app.use(express.json());
app.use("/api/",groceryItemRoutes);
// Export Express API for Vercel
export default app;