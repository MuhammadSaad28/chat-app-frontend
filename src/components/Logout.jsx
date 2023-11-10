import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
       localStorage.clear();
       navigate("/login"); 
    }
  return (
    <button style={{ display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'0.5rem' , borderRadius:'0.5rem', background:'#9a86f3' , cursor:'pointer', border:'none' }}>
        <BiPowerOff onClick={handleClick} style={{color:'#ebe7ff' , fontSize:'1.3rem' }} />
    </button>
  )
}

export default Logout