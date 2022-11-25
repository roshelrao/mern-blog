import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Blogs = () => {

    const [data,setData] = useState([]);

    const author = (JSON.parse(localStorage.getItem("userInfo")).data._id);

    const getMyBlogs = async() => {
        try {

            const config = {
                headers: {
                  author: author,
                },
              };
      
            const res = await axios.get('/myBlogs',config);
            setData(res.data);
            console.log(res.data)
            
          } catch (error) {
            toast.error("Error", {position:"top-center"});
          }
        }

    useEffect(() => {
        getMyBlogs();
        
    },[])

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} padding={10} >
    {data?.map((index)=>(
        <Grid item xs={2} sm={4} md={4} align="center">
        <BlogCard title={index.title} content={index.content} id={index._id}/> :
        </Grid>
    ))}
    </Grid>
  )
}
