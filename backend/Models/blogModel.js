const mongoose = require('mongoose');

const blogModel = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    title:{type:String, required:true},
    content:{type:String, required:true},
    pic:{type:String,default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
},
    {
        timestamps:true,
    }
)

const Blog = mongoose.model("Blog", blogModel);

module.exports = Blog;