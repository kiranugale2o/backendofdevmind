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
               // console.log(token)
            }else{
                res.json({"message":"unsuccess"})
            }
       
        }else{
            res.json({"message":"un esuccess"})
        }
        
    } catch (error) {
        res.json({"message":"unsuccess"})
        console.log("error is occurs")
    }
}

module.exports=LoginHandler;