/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/user/Header/Header";
import FriendListWidget from "../../components/user/widgets/FriendListWidget";
import MyPostWidget from "../../components/user/widgets/MyPostWidget";
import PostsWidget from "../../components/user/widgets/PostsWidget";
import UserWidget from "../../components/user/widgets/UserWidget";
import axios from "../../axios/axios";
import { setLoading } from "../../redux/postReducer";
import { io } from "socket.io-client";
import { clearUser } from "../../redux/singlereducer";

const Profile = ({block}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(()=>{
      if(block==true){
        dispatch(clearUser())
        navigate('/sign-in')
      }
  },[block])
  // const blockUserLoading = useSelector((store)=>store.theme.blockLoading);
  //  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(blockUserLoading){
  //     console.log('hi home');
    
  //       navigate('/sign-in')
  //   }
  // },[blockUserLoading])
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const isNotMobile = useMediaQuery("(min-width:1000px)");
  const [click, setClick] = useState(false);
  const [run, setRun] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const data = useSelector((store) => store.user?.payload?.userExist);
  const handleClick = () => {
    setRun(!run);
  };
  const handleEffect = () => {
    setClick(!click);
  };

  //api for fetch the user of any followers  with id and setUser with data
  const fetchUser = async () => {
    const data = await axios.get(`/profile/${userId}`);
    setUser(data.data);
  };
  useEffect(() => {
    fetchUser();
  }, [click, userId]);
  const details = useSelector((store) => store.user?.payload?.userExist);
  // if (!user) return null;

  const { _id, dp } = useSelector((store) => store.user.payload.userExist);

  const loading = useSelector((store) => store?.post?.loading);

  const checkUserId = () => {
    if (userId == _id) setCheckId(true);
  };

  useEffect(() => {
    checkUserId();
  }, [userId]);
  useEffect(() => {
    if (!loading) {
      // fetchUser()
      dispatch(setLoading());
    }
  }, [loading]);    
  const socket = io("https://ww2.circle-up.online/api");
  useEffect(() => {
    socket?.emit("new-user-add", _id);
  }, [socket, data]);
  const isProfile = true;

  return (
    <Box>
      <Header socket={socket} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNotMobile ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNotMobile ? "26%" : undefined}>
          {/* pass the userId here if it is possible */}
          {user && (
            <UserWidget userId={userId} isProfile={isProfile} checkId={checkId} profilePic={dp} details={details}/>
          )}
          <Box m="2rem 0" />
          {/* pass the userId as props */}
          <FriendListWidget
            userId={userId}
            handleEffect={handleEffect}
            handleClick={handleClick} isProfile
          />
        </Box>
        <>
          <Box
            flexBasis={isNotMobile ? "42%" : undefined}
            mt={checkId && isNotMobile ? "-0rem" : "-2rem"}
          >
            {" "}
            {checkId && <MyPostWidget dp={dp} details={details} />}
            <Box m="2rem 0" />
            {/* pass the userId as props */}
            <PostsWidget isProfile={isProfile} userId={userId} dp={dp} socket={socket} />
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default Profile;
