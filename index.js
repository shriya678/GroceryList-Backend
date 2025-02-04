
import express from "express";
const app = express();
import mongoose from "mongoose";
import groceryItemRoutes from "./routes/groceryItemRoutes.js"
import cors from "cors";

const dbUrl= "mongodb+srv://grocerydb:grocerydb04@cluster0.y4q5e.mongodb.net/grocery?retryWrites=true&w=majority&appName=Cluster0";
// Enable CORS
app.use(
    cors({
      origin: "http://localhost:5173", // React app ka URL
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
app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})