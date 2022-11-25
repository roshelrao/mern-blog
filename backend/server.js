const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const User = require('./Models/userModel');
const Blog = require('./Models/blogModel');
const { response } = require('express');
const path = require('path');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000

app.use(express.json())

app.listen(PORT, console.log("Server Started!"));

connectDb();

app.get('/',(req,res) => {
    res.send("API is running");
})

app.post('/register',async (req,res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(400);
        throw new Error("Failed to create user");
    }
})

app.post('/login', async(req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && user.password == password){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})

app.post('/addBlog', async(req,res) => {
    const { author, title, content, pic} = req.body;

    if(!title || !content ){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const blog = await Blog.create({
        author,
        title,
        content,
        pic,
    })

    if(blog){
        res.status(201).json({
            _id: blog._id,
            author: blog.author,
            title: blog.title,
            content: blog.content,
            pic: blog.pic,
        })
    }else{
        res.status(400);
        throw new Error("Failed to create blog");
    }

})

app.get('/getAll', async(req,res) => {
    Blog.find((err, val) => {
        if (err){
            console.log(err);
        }else{
            res.json(val)
        }
    })
})

app.get('/myBlogs', async(req,res) => {
    const { author } = req.headers;

    const userBlogs = await Blog.find({author})

    if(userBlogs){
        res.status(200).json(userBlogs)
    }else{
        res.status(400);
        throw new Error("Failed to find blogs");
    }
})

app.get('/getBlog', async(req,res) => {
    const { id } = req.headers;

    const blog = await Blog.findById(id)
    .populate("author", "-password");

    if(blog){
        res.status(200).json(blog)
        console.log(blog);
    }else{
        res.status(400);
        throw new Error("Failed to find blog");3
    }

})

app.put('/delete',async(req,res) => {
    const { blogId } = req.body;

    const removed = await Blog.findByIdAndRemove(blogId);

    if(!removed){
        res.send(404);
        throw new Error("Blog not found");
    }else{
        res.json(removed);
    }
})

app.put('/update',async(req,res) => {
    const { blogData } = req.body;

    const updated = await Blog.findByIdAndUpdate(blogData._id,
        {
            title:blogData.title,
            content:blogData.content,
            pic:blogData.pic,
        },
        {
            new:true
        }
    )

    if(!updated){
        res.send("Error");
    }else{
        res.json(updated);
    }
})

//----------------- Deployment --------------

// const __dirname1 = path.resolve();
// if(process.nextTick.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname1,'/frontend/build')));

//     app.get('*',(req,res) => {
//         res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
//     })
// }else{
//     app.get('/',(req,res) => {
//         res.send("API is running");
//     })
// }

//----------------- Deployment --------------
