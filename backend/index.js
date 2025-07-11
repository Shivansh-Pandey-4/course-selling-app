const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const contactRouter = require("./routes/contactRoutes");
const courseRouter = require("./routes/courseRoutes");
const mongoose  = require("mongoose");
const app = express();
const port = 3000;

async function connectDb(){
     try{
         await mongoose.connect(process.env.MONGODB_URL);
         console.log("connected to db successfully");
            app.listen(port,()=>{
                console.log(`app started listening on the port ${port}`);
            })
     }catch(err){
         console.log("cannot connect to db: ",err.message);
     }
}

connectDb();

app.use(cors(),express.json());
app.use("/user",userRouter);
app.use("/contact",contactRouter);
app.use("/courses",courseRouter);

