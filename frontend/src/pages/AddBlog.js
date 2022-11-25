import { Box, Button, FormLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddBlog = () => {

    const [title,setTitle] = useState();
    const [picture,setPicture] = useState();
    const [content,setContent] = useState();
    
    const author = (JSON.parse(localStorage.getItem("userInfo")).data._id);

    const submitHandler = async() => {
        if(!title || !content){
            toast.error("Please fill all the mandatory fields", {position:"top-center"});
            return;
        }

        try {
            const config = {
              headers:{
                "Content-Type":"application/json",
              }
            }
      
            const data = await axios.post('/addBlog',{author,title,picture,content},config);
      
            toast.success("Post added successfully!", {position:"top-center"});
      
            window.location.href='/myBlogs';
            
          } catch (error) {
            toast.error("Error", {position:"top-center"});
          }

    }
    
  return (
    <Box
      sx={{
        height:'100vh',
        padding:10,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        marginTop:'-100px',
      }}
    >
    <TextField required id='standard-required' variant='standard' label='Title' onChange={(e)=>setTitle(e.target.value)}></TextField>
    <FormLabel>Upload Image <br/><Button variant='outlined' style={{width:'25%'}} component='label' onChange={(e)=>setPicture(e.target.value)}>Choose Image<input type='file' hidden/></Button></FormLabel>
    <TextField multiline rows={10} required id='standard-required' variant='outlined' label='Content' onChange={(e)=>setContent(e.target.value)}/>
    <Button style={{marginTop:'-20px'}} variant='contained' onClick={submitHandler}>Publish</Button>
    <ToastContainer/>
    </Box>
  )
}

export default AddBlog