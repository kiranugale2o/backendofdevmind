const jwt=require('jsonwebtoken');
const User=require('../modules/user.modules')

const Authentication=async(req,res,next)=>{

  try {
    
    const auth=req.headers;
    const token=auth.cookie.split("jwt=")[1];//get tokens
    const verifyToken=jwt.verify(token,process.env.SECERATE_TOKEN_CODE);//verify token

    if(verifyToken){
      const user=await User.findOne({_id:verifyToken._id, "tokens":token})
      if(user){
        res.statusCode=200;
        res.json({user})
       
      }
   
    }
    
  } catch (error) {
    res.statusCode=400;
    console.log("not authorization")
   res.json({"message":"not authorization"}).status(400);
    
    
  }
    
 next();
  
 
}
module.exports=Authentication;