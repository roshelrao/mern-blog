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

const HomeBlogCard = (props) => {

  const [blog,setBlog] = useState();

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
      </CardActions>
    <ToastContainer/>
    </Card>
  )
}

export default HomeBlogCard