import React,{useState,useEffect,useRef} from 'react'
import './ChatContainer.css'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useMediaQuery } from 'react-responsive';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { addMsgAPI, getMsgAPI } from '../APIs';


const ChatContainer = ({ currentChat, currentUser , socket, setCurrentChat }) => {
    const [messages,setMessages] = useState([])
    const [arrivalMessage , setArrivalMessage] = useState(null)
    const scrollRef = useRef();
    const isMobile = useMediaQuery({maxWidth: 850, minWidth:360})
    const navigate = useNavigate()
    useEffect(()=>{
      async function getAllMessages(){
        if(currentUser){
           const response = await axios.post(getMsgAPI,{
               from: currentUser._id,
               to: currentChat._id,
           })
           
           setMessages(response.data)
           
        }
        }
       getAllMessages()
    },[currentChat])
    const handleSendMessage = async (msg)=>{
        await axios.post(addMsgAPI,{
            from: currentUser._id,
            to:currentChat._id,
            message: msg,
        })
        socket.current.emit("send-msg" , {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        })
        const msgs = [...messages]
        msgs.push({fromSelf:true,message:msg});
        setMessages(msgs)
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive", (msg)=>{
                setArrivalMessage({fromSelf: false, message: msg})
            })
        }
    },[])

   useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])
   },[arrivalMessage])

   useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
   },[messages])
   const HandleArrow = ()=>{
       setCurrentChat(undefined);
       navigate("/");
   }

     if (!currentChat) {
        return <div className="ChatContainer">Loading...</div>;
    }


    return (
        <div className='ChatContainer'>
            <div className="chat-header">
                <div className="user-details">

                   { isMobile && (
                         <button type='button' style={{ display:'flex' , justifyContent:'center' , alignItems:'center' , padding:'0.3rem' , borderRadius:'50%', background:'#9a86f3' , cursor:'pointer', border:'none' }}>
                         <BsArrowLeft onClick={HandleArrow} style={{color:'#ebe7ff' , fontSize:'1.3rem' }} />
                     </button>
                    )}
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        {currentChat.username}
                    </div>
                </div>
                    <div>
                        <Logout />
                    </div>
            </div>

          <div className="chat-messages">
            {
                
                Array.isArray(messages)?
                messages.map((message)=>{
                   return(
                    <div ref={scrollRef} key={uuidv4}>
                    <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                        <div className="content">
                            <p>
                                {message.message}
                            </p>
                        </div>
                    </div>
                    </div>
                   )
                }
            ): ""
            }
          </div>
          

           <ChatInput handleSendMessage={handleSendMessage}/>

        </div>
    )
}

export default ChatContainer