import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import './Savatar.css'
import { setAvatarAPI } from "../APIs";


const Savatar = () => {

    const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect( () => {
    if (!localStorage.getItem("Chat-APP-USER"))
      navigate("/login");
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("Chat-APP-USER"))
     
      if (user) {
        const { data } = await axios.put(`${setAvatarAPI}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
  
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("Chat-APP-USER", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      } else {
        toast.error("User data is missing or incomplete.", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          
          // Check if the response data is not undefined before creating a Buffer
          if (response.data) {
            const buffer = new Buffer(response.data);
            data.push(buffer.toString("base64"));
          } else {
            console.log("Received undefined data from the server.");
          }
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [api]);
  return (
    <>
      {isLoading ? (
        <div style={{width:'100vw' , height:'100vh' , display:'flex' , justifyContent:'center' , alignItems:'center' , background: '#1c1b2e' , overflow:'hidden'}}>
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div style={{ display: 'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center' , height: '100vh' , background:'#1c1b2e' , color:'white' , gap:'40px'}}>
          <div className="title-container">
            <h1 style={{ textAlign:'center' }}>Pick an Avatar as your profile picture</h1>
          </div>
          <div style={{ display:'flex' , gap: '40px' , flexWrap:'wrap' , justifyContent:'center' , alignItems:'center'}}>
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={` ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                    style={{ width:'85px' }}
                  />
                </div>
              );
            })}
          </div>
          <Link to="/">
          <button onClick={setProfilePicture} style={{ background:'transparent' , color:'white' , padding:'8px' , border:'1px solid white' , cursor:'pointer' }}>
            Set as Profile Picture
          </button>
          </Link>
          <ToastContainer />
        </div>
      )}
      </>
  )
}

export default Savatar