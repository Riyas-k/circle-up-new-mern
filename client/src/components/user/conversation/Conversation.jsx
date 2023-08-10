/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./Conversation.css";
import FlexBetween from "../../FlexBetween";
import UserImage from "../../UserImage";
import { Box, Typography } from "@mui/material";
import axios from "../../../axios/axios";

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data?.members.find((id) => id != currentUser);
    const getUserData = async () => {
      try {
        const data = await axios.get(`/${userId}`);
        setUserData(data.data);
        //dispatch
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {userData && (
            <>
              {online && <div className="online-dot"></div>}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <UserImage image={userData[0]?.dp ||"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" } size="55px" />
                <Box>
                  <Typography variant="h5" fontWeight="500">
                    {userData[0]?.UserName}
                  </Typography>
                  <Typography fontSize="0.75rem">
                    {online ? "Online" : "Offline"}
                  </Typography>
                </Box>
                <Box></Box>
              </div>
            </>
          )}
        </div>
      </div>

      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
