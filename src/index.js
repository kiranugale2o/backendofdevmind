const express=require("express");
const cloudinary=require("./utils/cloudinary");
require('dotenv').config();
require("./DB/connection")
const User=require("./modules/user.modules")
const cors=require('cors');
const app=express();
app.use(require("./router/route"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello")
  
})


app.listen(3001  ,(err)=>{
    console.log("server is running on  "+ process.env.PORT)
})
