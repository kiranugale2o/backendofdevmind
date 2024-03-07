const express=require("express");
const router=express.Router();
const SingUpHandler=require('../controllers/SingUpHandler');
const LoginHandler=require("../controllers/LoginHandler");
const Authentication=require("../controllers/Authentication");
const cookieParser = require('cookie-parser')
router.use(cookieParser())
router.use(express.urlencoded({extended:false}))
router.use(express.json());

router.post('/user/singup',SingUpHandler)
router.post('/user/login',LoginHandler)
router.get('/user/auth',Authentication,(req,res)=>{
    res.send(req.user);
});

module.exports=router;