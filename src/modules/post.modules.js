const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    userName:{
        type:String
    },
    userImg:{
        type:String
    },
    description:{
        type:String,
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:"0"
    },
    comment:[
        {
            userId:{
               type:String
            },
            userName:{type:String},
            userImg:{type:String},
            userComm:{type:String},
        }
    ]

},{
    timestamps:true
})

const Post=new mongoose.model("Post",postSchema);
module.exports=Post;
