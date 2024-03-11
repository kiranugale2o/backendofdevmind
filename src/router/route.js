const express=require("express");
const router=express.Router();
const Post=require('../modules/post.modules')
const SingUpHandler=require('../controllers/SingUpHandler');
const LoginHandler=require("../controllers/LoginHandler");
const Authentication=require("../controllers/Authentication");
const PostCreate=require("../controllers/Posthandle")
const User=require('../modules/user.modules')
const cookieParser = require('cookie-parser')
router.use(cookieParser())
router.use(express.urlencoded({extended:false}))
router.use(express.json());
//creating profile
router.post('/user/singup',SingUpHandler)
//updating profile
router.put('/user/profileupdate',async(req,res)=>{
    try {
        const _id=req.body._id;
        const Name=req.body.Name;
        const userName=req.body.userName;
        const bio=req.body.bio;
        const userImg=req.body.url;
        const language=req.body.lan;
        const user=await User.findById({_id});
        if(user){
            const updateuser= await User.updateOne({}, { $set: {Name,userName,bio,userImg,language} });
            if(updateuser){
            res.json({"message":"success"})
            }
        }else{
            res.json({"message":"unsuccess"})
        }
           
    } catch (error) {
        res.json({"message":"somthing went wrong"}).status(400)
    }
})
router.post('/user/login',LoginHandler)
router.get('/user/auth',Authentication,(req,res)=>{
    res.send(req.user);
});

//post part
router.post('/yourpost',async(req, res)=>{
    try {
        const userId=req.body.id;
        console.log(userId)
        // const posts=await Post.find({userId})
        // if(posts){
        //    res.json({posts})
        //  console.log(posts)
        // }
        
    } catch (error) {
        res.json("unSuccess").status(400);
        console.log(error)
    }
})
router.post('/user/sendpost',PostCreate,(req,res)=>{});
router.get('/user/getpost',async(req,res)=>{
 
        try {
            const data=await Post.find({});
           if(data){
              res.json({data});
           }else{
            res.json({"message":"not post"})
           }
        } catch (error) {
            console.log(error)
        }
})


//find developers

router.get("/find/developers",async(req,res)=>{
    try {
        
        const users=await User.find({});
         res.json(users);

    } catch (error) {
        console.log(error)
    }
})


router.post("/sendComment",async(req,res)=>{
    try {
        
        const{pid,uid,userComm}=req.body;
      
           const user=await User.find({_id:uid})
       const username=user[0].userName;
      const userImg=user[0].userImg;
     
    Post.findOneAndUpdate({userId:pid},{$push:{comment:{userId:uid,userName:username,userImg,userComm}}}).then((d)=>{
        console.log(d)
    })
      
        
    } catch (error) {
        res.json({"message":"invalid request"})
        console.log(error)
    }
})
module.exports=router;