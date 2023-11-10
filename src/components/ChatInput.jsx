import React, { useState } from 'react'
import Picker from 'emoji-picker-react'

import { IoMdSend } from 'react-icons/io'   
import { BsEmojiSmileFill } from 'react-icons/bs'
import './ChatInput.css'


const ChatInput = ({ handleSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");
    const HandleEmojiPickerHideShow = ()=>{
       setShowEmojiPicker(!showEmojiPicker) 
    }
    const HandleEmojiClick = (emojiObject) =>{
        const emoji = emojiObject.emoji;
        setMsg((prevMessage) => prevMessage + emoji);
    }
    const sendChat = (event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMessage(msg);
            setMsg("");
        }
    }
  return (
    <div className='ChatInput'>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={HandleEmojiPickerHideShow} />
                {
                    showEmojiPicker &&
                    <div style={{position:'absolute',height:'360px', top:'-395px', background: '#080420', overflow:'hidden', padding:'12px 0'}}>
                     <Picker onEmojiClick={HandleEmojiClick} disableAutoFocus={true} theme='dark' pickerStyle={{ theme:'dark' , height:'100%' }} searchDisabled={true} />  
                </div>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='Enter Your Message Here' value={msg} onChange={(e)=>setMsg(e.target.value)} />
            <button className="submit" type='submit'>
                <IoMdSend/>
            </button>
        </form>
    </div>
  )
}

export default ChatInput