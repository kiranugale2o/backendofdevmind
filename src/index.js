const express=require("express");
const cloudinary=require("./utils/cloudinary");
require('dotenv').config();
require("./DB/connection")
const User=require("./modules/user.modules")
const app=express();
app.use(require("./router/route"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.get("/ee",(req,res)=>{
    res.send("njj")
  
})

app.post("/send",async(req,res)=>{
   
    const result = await cloudinary.uploader.upload(req.body);
    console.log(result.secure_url)
// Output: "https://res.cloudinary.com/demo/raw/upload/sample_spreadsheet.xls"
})

app.listen(4000  ,(err)=>{
    console.log("server is running on 4000 ")
})