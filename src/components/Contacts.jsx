import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import loader from '../assets/loader.gif'
import './Contacts.css'


const Contacts = ({ contacts, currentUser , changeChat }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(()=>{
        if (!contacts) {
            return <div >
                <div style={{width:'100vw' , height:'100vh' , display:'flex' , justifyContent:'center' , alignItems:'center' , background: '#1c1b2e' , overflow:'hidden'}}>
              <img src={loader} alt="loader" className="loader" />
            </div>
            </div>;
          }
    },[contacts])
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact)
    }
    

    

    return (
        <div className='main'>
            {
                currentUserImage && currentUserName && (
                    <div className='container1'>
                        <div className="brand">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className='contacts'>
                            {Array.isArray(contacts) && contacts.length > 0 ? (
                                contacts[0].map((contact, index) => (
                                    <div className={`contact ${index === currentSelected ? "selected" : ''}`} key={contact._id} onClick={()=>changeCurrentChat(index,contact)} >
                                        <div className='avatar'>
                                            <img
                                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                alt="avatar"
                                            />
                                        </div>

                                        <div className='username'>
                                            {contact.username}
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div>No contacts available</div>
                            )}

                        </div>



                        <div className='current'>
                            <div className='avatar'>
                                <img
                                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt="avatar"
                                />
                            </div>

                            <div className='username'>
                                {currentUserName}
                            </div>
                        </div>
                    </div>


                )
            }




        </div>
    )
}

export default Contacts