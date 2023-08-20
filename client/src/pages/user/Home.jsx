/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/user/Header/Header";
import FriendListWidget from "../../components/user/widgets/FriendListWidget";
import MyPostWidget from "../../components/user/widgets/MyPostWidget";
import PostsWidget from "../../components/user/widgets/PostsWidget";
import UserWidget from "../../components/user/widgets/UserWidget";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/singlereducer";
// import { userBlocked } from "../../redux/loginReducers";
// import { useDispatch, useSelector } from "react-redux";

function Home({ block }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if (block == true) {
      dispatch(clearUser())
      navigate("/sign-in");
    }
  }, [block]);
  // const blockUserLoading = useSelector((store)=>store.theme.blockLoading);
  // useEffect(()=>{
  //   if(blockUserLoading){
  //     console.log('hi home');

  //       navigate('/sign-in')
  //   }
  // },[blockUserLoading])
  const isNotMobile = useMediaQuery("(min-width:1000px)");
  const data = useSelector((store) => store.user?.payload.userExist || store.user.payload.data?.isEmailExist);
  console.log(data,'jo');
  const { _id } = data;
  const { dp } = data;
  const [click, setClick] = useState(false);

  const details = useSelector((store) => store?.user?.payload?.userExist);

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {}, [click]);
  const socket = io("https://ww2.circle-up.online");
  useEffect(() => {
    socket?.emit("new-user-add", _id);
  }, [socket, data]);
  const isProfile = false;
  // if(!data) return null
  return (
    <>
      <Header socket={socket} />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNotMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNotMobile ? "26%" : undefined}>
          <UserWidget userId={_id} details={details} />
        </Box>
        <Box
          flexBasis={isNotMobile ? "45%" : undefined}
          mt={isNotMobile ? undefined : "2rem"}
        >
          <MyPostWidget dp={dp} details={details} />
          <PostsWidget
            isProfile={isProfile}
            click={click}
            userId={_id}
            dp={dp}
            socket={socket}
          />
        </Box>
        {isNotMobile && (
          <Box flexBasis="26%">
            <FriendListWidget dp={dp} userId={_id} details={details} />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Home;
