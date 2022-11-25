import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import register from '../assets/register.jpg'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogCard = (props) => {

  const [blog,setBlog] = useState();

  const editPost = async(blogId) => {
    console.log(blogId);

    try {
      const config = {
        headers: {
          id: blogId,
        }
      }

      const data = await axios.get('/getBlog',config);
      setBlog(data);
      console.log(data);

      localStorage.setItem("blogInfo", JSON.stringify(data));

      window.location.href='/edit'

    } catch (error) {
      toast.error("Error", {position:"top-center"})
    }
  }

  const deletePost = async(blogId) => {
    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
        }
      }

      const data = await axios.put('/delete',{blogId},config);

      toast.success("Post deleted successfully!", {position:"top-center"});

      window.location.href='/myBlogs';

    } catch (error) {
      toast.error("Error", {position:"top-center"});
    }
  }

  const viewPost = async(blogId) => {
    try {
      const config = {
        headers: {
          id: blogId,
        }
      }

      const data = await axios.get('/getBlog',config);
      setBlog(data);
      console.log(data);

      localStorage.setItem("blogInfo", JSON.stringify(data));

      window.location.href='/view'

    } catch (error) {
      toast.error("Error", {position:"top-center"})
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image={register}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  }}>
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>viewPost(props.id)}>Read</Button>
        <Button size="small" onClick={()=>editPost(props.id)}>Edit</Button>
        <Button size="small" color='warning' onClick={()=>deletePost(props.id)}>Delete</Button>
      </CardActions>
    <ToastContainer/>
    </Card>
  )
}

export default BlogCard