const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
   Name:{
    type:String,
    require:true
   },
   userName:{
    type:String,
    require:true
   },
   email:{
    type:String,
    require:true
   },
   password:{
    type:String,
    require:true,
   },
   userImg:{
    type:String,
    require:true,
    defualt:""
   },
   bio:{
    type:String,
    require:true,
    default:""
   },
   language:{
    type:String
   },
   followers:[
    {
        userId:{type:mongoose.Schema.Types.ObjectId},
        Name:{type:String,require:true},
        userName:{type:String,require:true},
        userImg:{type:String,require:true}
    }
   ],
   following:[
    {
        userId:{type:mongoose.Schema.Types.ObjectId},
        Name:{type:String,require:true},
        userName:{type:String,require:true},
        userImg:{type:String,require:true}
    }
   ],
  savedPost:[
    {
        userId:{type:String},
        userName:{type:String},
        userImg:{type:String},
        description:{type:String},
        img:{type:String},
        likes:[],
        comments:[{
            userId:{type:String},
            userName:{type:String},
            userImg:{type:String}
        }]
    }
  ]
  ,
   posts:[
    
   ]
   ,
   tokens:[]

},{
    timestamps:true,
})


userSchema.pre('save',async function(next){
      if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password ,12);
      }
      next();
} )

userSchema.methods.generateAuthToken=async function(){
  try {
      const token=jwt.sign({_id:this._id,userName:this.userName},process.env.SECERATE_TOKEN_CODE);
      this.tokens.push(token);
      await this.save();
      return token;
  } catch (error) {
      console.log(error)
  }
}

const User=mongoose.model("User",userSchema);

module.exports=User;