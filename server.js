require('dotenv').config();

const mongoose= require("mongoose");
const express = require('express');
const authRoute = require("./routes/auth")
const jobRoute = require("./routes/job")
const cors =  require("cors");


const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(" DB Connected!"))
  .catch ((error)=>console.log("error",error));
app.get("/api/health",(req,res)=>{
    console.log("hey health");
    res.json({
        service:"Backend server",
        time :new Date()
    });
});

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/job", jobRoute);

app.use("*",(req,res)=>{
   res.status(404).json({errorMessage: "Route not found!"})
});

app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).json({errorMessage:"something went wrong!"})
})


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Backend server running at ${PORT}`)
});
