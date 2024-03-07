const { configDotenv } = require("dotenv");
const mongoose =require("mongoose");


mongoose.connect(process.env.Mongo_DB).then(()=>{
    console.log("connection successful ")
})
.catch(()=>{
    console.log("filed !!!!!!!")
})

module.exports;
