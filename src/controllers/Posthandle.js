const Post=require("../modules/post.modules")
const User=require("../modules/user.modules");

const PostCreate=async(req,res,next)=>{
       
    try {

        const post=await Post(req.body);
        const result=await post.save();
     
        if(result){
            res.status(200)
            res.json({"message":"POst will be send"})
        }else{
            res.json({"message":"POst will be not send"})
        }
    } catch(error) {
        console.log("error")
    }
next();
}


module.exports= PostCreate;
