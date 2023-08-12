import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Header from "../../../components/user/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "../../../components/user/conversation/Conversation";
import ChatBox from "../../../components/user/ChatBox/ChatBox";
import { io } from "socket.io-client";
import axios from "../../../axios/axios";
import { setChatLoading } from "../../../redux/themeSlice";

const Chat = () => {
  const socket = useRef();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const user = useSelector((store) => store.user?.payload?.userExist);
  useEffect(() => {
    socket.current = io("https://ww2.circle-up.online/");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(users, "socket-users");
    });
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
      console.log(data, "socket-data");
    });

    return () => {
      if (socket.current) {
        console.log("disconnect");
        socket.current.disconnect();
      }
    };
  }, [user, receiveMessage]);
  useEffect(() => {
    if (sendMessage != null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(`chat/${user?._id}`);
        console.log(data.chats);
        setChats(data?.chats);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  
  }, [user?._id]);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member != user._id);
    const online = onlineUsers.find((user) => user.userId == chatMember);
    return online ? true : false;
  };

  return (
    <>
      <Header />
      <div className="Chat">
        <div className="Chat-container">
          <div className="Left-side-chat">
            <h5>Chats</h5>
            <div className="Chat-list">
              {chats.map((chat) => {
                console.log(chat,'inside loop');
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div key={chat} onClick={() => setCurrentChat(chat)}>
                    <Conversation
                      data={chat}
                      currentUser={user?._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="Right-side-chat">
          <React.Fragment key={currentChat}>
            <ChatBox
              chat={currentChat}
              currentUser={user?._id}
              setSendMessage={setSendMessage}
              receivedMessage={receiveMessage}
            />
          </React.Fragment>
        </div>
      </div>
    </>
  );
};

export default Chat;
