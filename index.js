const express=require("express");
require('dotenv').config();
require("./src/DB/connection")
const User=require("./src/modules/user.modules")
const cors=require('cors');
const app=express();
app.use(require("./src/router/route"));
app.use(express.json());
app.use(express.urlencoded({extended:false})) 
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.get("/",(req,res)=>{
    res.send("home")
  
})
app.listen(process.env.PORT || 5000  ,(err)=>{
    console.log("server is running on  "+ process.env.PORT)
})