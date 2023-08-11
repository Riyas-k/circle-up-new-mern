/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";
import UserImage from "../../UserImage";
import { format } from "timeago.js";
import { Box, Typography } from "@mui/material";
import { setChatLoading } from "../../../redux/themeSlice";
import { VideoCall } from "@mui/icons-material";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  //destructure props
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
  const user = useSelector((store) => store.user?.payload.userExist);
  const dispatch = useDispatch();

  const handleMessage = async (newMessage) => {
    setNewMessage(newMessage);
  };
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage?.chatId == chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const data = await axios.get(`/${userId}`);
        setUserData(data?.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await axios.get(`message/${chat?._id}`);
        setMessages(data?.data?.messages);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(chat, "pls keri");
    if (chat != null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser,
      message: e.message ? e.message : newMessage,
      chatId: chat?._id,
    };

    const receiverId = chat?.members?.find((id) => id !== currentUser);
    setReceiver(receiverId);
    setSendMessage({ ...message, receiverId });
    try {
      const data = await axios.post("/message", message);
      if (data) {
        setMessages([...messages, data?.data?.messages]);
        setNewMessage("");
        dispatch(setChatLoading());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleVideoCall = async () => {
   
    const roomUrl =` https://circle-up.online/room/${user._id}`;
    const message = `Join this room to video chat: ${roomUrl}`;
    const event = {
      preventDefault:()=>{},
      message:message
    }
     await handleSend(event);
    navigate(`/room/${user._id}`);
  };
  const scroll = useRef();

  return (
    <>
      <div className="ChatBox-container" style={{ height: "70vh" }}>
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div
                  style={{ display: "flex", justifyContent: "flex-start" }}
                  onClick={() => {
                    if (receiver) navigate(`/profile/${receiver}`);
                    // navigate(0); // to change url on friends friends profile
                  }}
                >
                  <UserImage image={userData?.dp || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} size="55px" />
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="500"
                      sx={{ padding: "0.5rem" }}
                    >
                      {userData?.UserName}
                    </Typography>
                    <VideoCall
                      onClick={handleVideoCall}
                      sx={{ fontSize: "25px", cursor: "pointer" }}
                    />
                  </Box>
                  <Box></Box>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
              </div>
            </div>
            <div className="chat-body">
              {messages.map((message) => (
                <div
                  ref={scroll}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                  key={message.id}
                >
                  {message.message.startsWith("Join this room to video") ? (
                    <>
                      {message.message.match(/https?:\/\/\S+/) ? (
                        <span
                          onClick={() =>
                            navigate(
                              `/room/${
                                message.message.match(/\/room\/(\w+)/)[1]
                              }`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {message.message}
                        </span>
                      ) : (
                        <span>{message.message}</span>
                      )}
                      <span>{format(message.createdAt)}</span>
                    </>
                  ) : (
                    <>
                      <span>{message.message}</span>
                      <span>{format(message.createdAt)}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="chat-sender">
              {/* <div></div> */}
              <InputEmoji value={newMessage} onChange={handleMessage} />
              <button
                className={`send-button button ${
                  !newMessage.trim() ? "disabled" : ""
                }`}
                disabled={!newMessage.trim()}
                onClick={handleSend}
              >
                Send
              </button>
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">Tap a chat to start</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
