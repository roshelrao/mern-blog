import { Box, Button } from '@mui/material'
import React ,{ useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import register from '../assets/register.jpg'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';


const Login = (props) => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [loading,setLoading] = useState(false);

  if(props.isLogout){
    localStorage.removeItem("userInfo");
    window.location.href='/login'
  }

  const submitHandler = async() => {
    setLoading(true);
    if(!email || !password){
      toast.error("Please fill in all the details", {position:"top-center"});
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
        }
      }

      const data = await axios.post('/login',{email,password},config);

      toast.success("Login Successful", {position:"top-center"});

      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);

      window.location.href='/myBlogs';
      
    } catch (error) {
      toast.error("Error", {position:"top-center"});
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
      <h1 style={{textAlign:'center',color:'#1976d2'}}>Login</h1>
      <TextField required id='standard-required' variant='standard' label='Email' onChange={(e) => setEmail(e.target.value)}/>
      <TextField required id='standard-required' variant='standard' label='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
      <Button variant="contained" size="medium" style={{marginTop:'10px'}} onClick={submitHandler} isLoading={loading}>Login</Button>
    </Box>
    <ToastContainer/>
    </div>
  )
}

export default Login