import { Box, Button, FormLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddBlog = () => {
  const [title, setTitle] = useState();
  const [picture, setPicture] = useState();
  const [content, setContent] = useState();
  const [blogData, setBlogData] = useState({});

  const updateHandler = async() => {

      try {
          const config = {
            headers:{
              "Content-Type":"application/json",
            }
          }

          const data = await axios.put('/update',{blogData},config);

          toast.success("Post added successfully!", {position:"top-center"});

          localStorage.removeItem("blogInfo");

          window.location.href='/myBlogs';

        } catch (error) {
          toast.error("Error", {position:"top-center"});
        }

  }

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
        height: "100vh",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginTop: "-100px",
      }}
    >
        {console.log(blogData)}
      {blogData && (
        <>
          {/* <TextField
            required
            id="standard-required"
            variant="standard"
            label="Title"
            onChange={(e) => setBlogData({...blogData, title:e.target.value})}
            defaultValue={blogData.title}
            focused
          /> */}
          <TextField
            multiline
            rows={1}
            required
            id="standard-required"
            variant="outlined"
            label="Content"
            onChange={(e) => setBlogData({...blogData, title:e.target.value})}
            defaultValue={blogData.title}
            focused
          />
          <FormLabel>
            Upload Image <br />
            <Button
              variant="outlined"
              style={{ width: "25%" }}
              component="label"
              onChange={(e) => setPicture(e.target.value)}
            >
              Choose Image
              <input type="file" hidden />
            </Button>
          </FormLabel>
          <TextField
            multiline
            rows={10}
            required
            id="standard-required"
            variant="outlined"
            label="Content"
            onChange={(e) => setBlogData({...blogData, content:e.target.value})}
            defaultValue={blogData.content}
            focused
          />
          <Button style={{ marginTop: "-20px" }} variant="contained" onClick={updateHandler}>
            Update
          </Button>
        </>
      )}
      <ToastContainer />
    </Box>
  );
};

export default AddBlog;
