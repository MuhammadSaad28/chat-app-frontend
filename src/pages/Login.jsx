import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import logo from '../assets/logo.png'
import { Link , useNavigate } from 'react-router-dom'
import { ToastContainer , toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginAPI } from '../APIs'

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  


  const toastOptions = {
    position : 'bottom-right' , 
    autoClose: 8000 ,
    pauseOnHover: true ,
    draggable: true ,
    theme: 'dark',
  }

  useEffect(()=>{
      if(localStorage.getItem("Chat-APP-USER")){
        navigate("/")
      }
  },[navigate])

  const submitValidation = ()=>{
   
  if(email.length === ""){
  toast.error("Email Address is required" , toastOptions)
 return false;

}
else if(password.length === ""){
  toast.error("Password is Required." , toastOptions)
 return false;
 
}
     
   
   return true;
}  

const HandleSubmit = async (e)=>{
  e.preventDefault();
  
  if(submitValidation()){
    const { data } = await axios.post(loginAPI, {
      email,
      password,
    })
    if(data.status === false){
        toast.error(data.msg , toastOptions)
    }
    if(data.status === true){
      localStorage.setItem("Chat-APP-USER" ,JSON.stringify(data.user));
       navigate("/");
    }
  }

  
}

  return (
    <div style={{color:'white'}}>
    <Box display='flex' justifyContent='center' alignItems='center'  sx={{background: '#1c1b2e ', height:'100vh' , width: '100vw'}}>
      <form style={{display:'flex' , flexDirection:'column' , gap: '25px' , background:'#0c1b1e' , border: '1px solid white' , padding:'40px 20px' }} onSubmit={(e)=>HandleSubmit(e)}>
        <img src={logo} alt="Logo" width='60%' />
        <input type="email" name='email' placeholder='Email' style={{padding:'14px' , background: 'transparent' , color:'white' , border:'1px solid white' , outline:'none'}} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name='password' placeholder='Password' style={{padding:'14px' , background: 'transparent' , color:'white' , border:'1px solid white' , outline:'none'}} onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit' style={{background:'transparent' , color:'white' , padding:'8px' , border:'1px solid white' , cursor:'pointer'}}>Login</button>

        <span style={{color:'white' , textAlign:'center'}}>Already Have an Account? <Link to='/register' style={{textDecoration:'none'}}>Register</Link> </span>

      </form>
    
    </Box>
     <ToastContainer/>
    </div>
  )
}

export default Login