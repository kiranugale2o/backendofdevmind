const User=require("../modules/user.modules")
const SingUpHandler=async(req,res,next)=>{
    try {
      
const result=await User(req.body);
await result.save();

if(result){
    
    token=await result.generateAuthToken();//call generateAuthToken() inside the userSchema and generate and store token
    res.cookie("jwt",token);
    console.log(res.cookies);
    res.json({"message":"successfull register "})
    console.log(result);
}
 } catch (error) {
     console.log("errr")
 }
   
}

module.exports=SingUpHandler;