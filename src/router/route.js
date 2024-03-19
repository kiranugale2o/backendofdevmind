const express = require("express");
const router = express.Router();
const Post = require('../modules/post.modules');
const SingUpHandler = require('../controllers/SingUpHandler');
const LoginHandler = require("../controllers/LoginHandler");
const Authentication = require("../controllers/Authentication");
const PostCreate = require("../controllers/Posthandle");
const User = require('../modules/user.modules');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Creating profile
router.post('/user/singup', SingUpHandler);

// Updating profile
router.put('/user/profileupdate/:_id', async (req, res) => {
    try {
        
        const uid=req.params._id;
        const Name=req.body.Name;
        const userName=req.body.userName;
        const userImg=req.body.userImg;
        const bio=req.body.bio;
        const language=req.body.language;

        const user = await User.findById({_id:uid});
       
        if (user) {
            const updateuser = await User.findOneAndUpdate({_id:uid}, {Name:Name,userName:userName,userImg:userImg,bio:bio,language:language});
            //  await updateuser.save();
            if (updateuser) {
                res.json({ "message": "success" });
               
            }
        } else {
            res.json({ "message": "unsuccess" });
        }
    } catch (error) {
        res.json({ "message": "something went wrong" }).status(400);
    }
});

router.post('/user/login', LoginHandler);

router.get('/user/auth', Authentication, (req, res) => {
    res.send(req.user);
});

// Post part
router.post('/yourpost', async (req, res) => {
    try {
        const userId = req.body.id;
        console.log(userId);
        // const posts = await Post.find({ userId });
        // if (posts) {
        //    res.json({ posts });
        //  console.log(posts);
        // }
    } catch (error) {
        res.json("unSuccess").status(400);
        console.log(error);
    }
});

router.post('/user/sendpost', PostCreate, (req, res) => {});

router.get('/user/getpost', async (req, res) => {
    try {
        const data = await Post.find({});
        if (data) {
            res.json({ data });
        } else {
            res.json({ "message": "no post" });
            console.log("invalid");
        }
    } catch (error) {
        console.log(error);
    }
});

// Find developers
router.get("/find/developers", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

// Send comments on post
router.post("/sendComment", async (req, res, next) => {
    try {
        const { pid, uid, userComm } = req.body;
        console.log(req.body);
        const post = await Post.findById({ _id: pid });
        const postid = post.userId;
        if (postid == uid) {
            res.json("You cannot comment on your own post");
            next();
        } else {
            const user = await User.find({ _id: uid });
            if (user) {
                const userName = user[0].userName;
                const userImg = user[0].userImg;
                const data = await Post.findOneAndUpdate({ _id: pid }, { $push: { comment: { uid, userName, userImg, userComm } } });
                console.log(data);
                res.json("COMMENT POST SUCCESSFULLY");
            } else {
                res.json({ "message": "NETWORK PROBLEM" });
            }
        }
    } catch (error) {
        res.json({ "message": "invalid request" });
        console.log(error);
    }
});

// Get comments
router.get('/post/getComment/:postid', async (req, res) => {
    try {
        const postId = req.params.postid;
        const comments = await Post.findById({ _id: postId });
        res.json(comments.comment).status(200);
    } catch (error) {
        res.json(error).status(400);
    }
});

// Post setLikes
router.post("/post/setLike/:postid", async (req, res) => {
    try {
        const postId = req.params.postid;
        const { likecol, userName } = req.body;
        if (likecol === 'black') {
            const post = await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: userName } });
            const likes = post.likes.length;
            res.status(200).json(likes + 1);
        } else {
            const post = await Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: userName } });
            const likes = post.likes.length;
            res.json(likes - 1);
        }
    } catch (error) {
        res.json(error);
    }
});

// Post saved
router.post("/post/save/:postID", async (req, res) => {
    try {
        const postId = req.params.postID;
        const userId = req.body.userId;
        const postdata = await Post.findById({ _id: postId });
        if (postdata) {
            const postId = postdata._id;
            const userName = postdata.userName;
            const userImg = postdata.userImg;
            const description = postdata.description;
            const img = postdata.img;
            const likes = postdata.likes;
            const comments = postdata.comment;
            const user = await User.findOneAndUpdate({ _id: userId }, { $push: { savedPost: { userId: postId, userName, userImg, description, img, likes, comments } } });
            res.json({ "message": "saved" });
        } else {
            res.json({ "message": "unsaved" });
        }
    } catch (error) {
        console.log(error);
        res.json({ "message": "unsaved" });
    }
});

// Get saved posts of user
router.get("/getSavePosts/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId) {
            const user = await User.findById({ _id: userId });
            const savePost = user.savedPost;
            console.log(savePost);
            res.json(savePost);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.log(error);
        res.json("No Saved Posts");
    }
});

module.exports = router;
