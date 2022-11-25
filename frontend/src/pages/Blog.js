import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import register from '../assets/register.jpg'

const Blog = () => {

  const [blogData,setBlogData] = useState();  

  const getBlogInfo = () => {
    if (localStorage.getItem("blogInfo") !== null) {
      setBlogData(JSON.parse(localStorage.getItem("blogInfo")).data);
      console.log(blogData);
    }
  };

  useEffect(() => {
    getBlogInfo();
  }, []);

  return (
    <Box
      sx={{
        height:'100vh',
        padding:10,
        display:'flex',
        flexDirection:'column',
        justifyContent:'normal',
        alignItems:'center',
        marginTop:'-100px',    
      }}
    >
      {blogData && (
        <>
      <h1 style={{paddingTop:'40px', width:'800px',margin:'0px'}}>{blogData.title}</h1>
      <h5 style={{width:'800px'}}>{blogData.author.name}</h5>
      <img src={register} style={{height:'400px',width:'800px'}}/>
      <div style={{width:'800px'}}>
      <p>{blogData.content}</p>
      </div>
      </>
    )}
    </Box>
  )
}

export default Blog