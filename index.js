const express = require("express")
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const User  = require("./models/User");
const Post = require("./models/Post");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})
connection.on("error",(err)=>{
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/user", async (req, res)=>{
    const {username, password} = req.body;
    console.log(username, password);
    const user = await User.findOne({username, password});
    if(user){
        res.send(user);
    }
    else{
        res.send("Invalid Credentials");
    }
})

app.post("/newPost", async (req, res)=>{
    const {text, image, user} = req.body;
    const post = new Post({text, image, user});
    const result = await post.save();
    res.send(result);
})

app.get("/posts", async (req, res)=>{
    const posts = await Post.find();
    res.send(posts);
})

app.post("/like", async (req, res)=>{
    const {id} = req.body;
    const post = await Post.findById(id);
    post.likes++;
    post.save();
    res.send("liked!!");
})

app.post("/comment", async (req, res) =>{
    const {id, user, text} = req.body;
    const comment = {user, text};
    const post = await Post.findById(id);
    post.comments.push(comment);
    post.save();
    res.send("commented!!");    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})