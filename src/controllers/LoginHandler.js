const User=require("../modules/user.modules")
const bcrypt=require("bcryptjs")

const LoginHandler=async(req,res,next)=>{
    try {
        const userName=req.body.userName;
        const password=req.body.password;

        const userInfo=await User.findOne({userName:userName});

        if(userInfo){
            const isMatch=await bcrypt.compare(password,userInfo.password);
            if(isMatch){
              
                token=await userInfo.generateAuthToken();//call generateAuthToken() inside the userSchema and generate and store token
                 res.cookie("jwt",token);
               console.log(token)
               res.json({message:"success",status:0})
            }else{
              
                res.json({message:"password encorrect",status:1})
            }
       
        }else{
            res.json({message:"invalid email",status:1})
        }
        
    } catch (error) {
        res.json({"message":"unsuccess"}).status(400)
        console.log("error is occurs")
    }
}

module.exports=LoginHandler;