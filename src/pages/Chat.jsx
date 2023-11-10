import React, { useState,useEffect,useRef } from 'react'
import './Chat.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client'
import { useMediaQuery } from 'react-responsive';
import { allUsersAPI, host } from '../APIs';


const Chat = () => {
   const socket = useRef();
  const navigate = useNavigate();
 const [contacts , setContacts] = useState([]);
 const [currentUser , setCurrentUser] = useState(undefined);
 const [currentChat , setCurrentChat] = useState(undefined);
 const [isLoaded , setIsLoaded] = useState(false);
 const isMobile = useMediaQuery({maxWidth: 850, minWidth:360})
 const isPc = useMediaQuery({minWidth: 851})
 
 

 useEffect( ()=>{
  async function getCurrentUser(){

    if(!localStorage.getItem("Chat-APP-USER")){
     navigate("/login");
    }else{
      const user = await JSON.parse(localStorage.getItem("Chat-APP-USER"))
     setCurrentUser(user)
     setIsLoaded(true);
    }
  }
  getCurrentUser();
 },[navigate])

useEffect(()=>{
  if(currentUser){
    socket.current=io(host)
    socket.current.emit("add-user" , currentUser._id)
  }
},[currentUser])

 useEffect( ()=>{
   async function getContacts(){
     if(currentUser){
      
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersAPI}/${currentUser._id}`)
          if(Array.isArray(data.data)){
            setContacts(data.data.users)
          }else{
            setContacts([data.data.users])
          }
                  
        }
        else{
          navigate("/setAvatar");
        }
    }
  }
  getContacts();
},[currentUser])


const HandleChatChange = (chat)=>{
     setCurrentChat(chat);
     
}




  return (
    <div style={{background:'#1c1b2e' , width:'100vw' , height: '100vh' , display:'flex' , flexDirection:'column',justifyContent:'center',alignItems:'center' , gap:'1rem' }}>

    {isPc && (
      <div  className='container'>
         <Contacts contacts={contacts} currentUser={currentUser} changeChat={HandleChatChange} />

         
         { isLoaded && currentChat === undefined ? (
           <Welcome currentUser={currentUser}  />
         ) : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} /> }
         

        
      </div>
      )}
      {
        isMobile && (
          
           <div  className='container-mobile'>

            {currentChat===undefined ? (
         <Contacts contacts={contacts} currentUser={currentUser} changeChat={HandleChatChange} />
          
            ):(
         
         <div >
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} setCurrentChat={setCurrentChat}/> 
          </div>

)}
      </div>
        )
      }
     
    </div>
  )
}

export default Chat