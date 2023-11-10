import React from 'react'
import Robot from '../assets/robot.gif'
import './Welcome.css'
const Welcome = ({currentUser}) => {
  return (
    <div className='Welcome'>
        <img src={Robot} alt="" />
        <h1>
            Welcome <span>{currentUser.username}</span>
        </h1>
        <h3>Select a Chat to Start Messaging</h3>
    </div>
  )
}

export default Welcome