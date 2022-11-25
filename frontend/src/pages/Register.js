import React, { useState } from 'react'
import register from '../assets/register.jpg'
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Register = () => {

  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast.error("Please fill in all the details",{position:"top-center"});
    }

    if(password !== confirmPassword){
      toast.error("Passwords do not match", {position:"top-center"})
    }

    try {
      const config = {
        headers:{
            "Content-Type":"application/json",
        },
    }

    const {data} = await axios.post('/register', {name,email,password},config);

    toast.success("Registration Successful",{position:"top-center"});

    setLoading(false);

    window.location.href = '/login';

    } catch (error) {
      toast.error("Error!",{position:"top-center"});
      setLoading(false);
    }
  }

  return (
    <div style={{background:`url(${register})`,backgroundSize:'cover',height:'90vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Box
      sx={{
        width: 400,
        height: 400,
        padding:3,
        margin:'auto',
        backgroundColor:'white',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        borderRadius:5,
      }}
    >
      <h1 style={{textAlign:'center',color:'#1976d2'}}>Register</h1>
      <TextField required id='standard-required' variant='standard' label='Full Name' onChange={(e) => setName(e.target.value)}/>
      <TextField required id='standard-required' variant='standard' label='Email' onChange={(e) => setEmail(e.target.value)}/>
      <TextField required id='standard-required' variant='standard' label='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
      <TextField required id='standard-required' variant='standard' label='Confirm Password' type='password' onChange={(e) => setConfirmPassword(e.target.value)}/>
      <Button variant="contained" size="medium" style={{marginTop:'10px'}} onClick={submitHandler} isLoading={loading}>Sign Up</Button>
    </Box>
    <ToastContainer/>
    </div>
  )
}

export default Register