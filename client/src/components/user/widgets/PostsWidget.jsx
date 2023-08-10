/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios/axios";
import {
  commentLoading,
  deletedLoading,
  likeLoading,
  profileLoading,
  setLoading,
  setPost,
} from "../../../redux/postReducer";
import PostWidget from "./PostWidget";
import { Box, LinearProgress } from "@mui/material";
import { followLoading } from "../../../redux/followReducer";

const PostsWidget = ({ click, isProfile, userId, dp,socket }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const [posts, setPosts] = useState([]);
  const loading = useSelector((store) => store.post.loading);
  const deleted = useSelector((store) => store.post.deleted);
  const comment = useSelector((store) => store.post.comment);
  const liked = useSelector((store) => store.post.liked);
  const data = useSelector((store) => store.post);
  const follow= useSelector((store)=>store?.follow?.loading);
  const fetchPosts = async () => {
    const res = await axios.get(`/posts/${userId}`);
    dispatch(setPost(res.data));
    setIsLoading(false);
    setPosts(res.data);
    // if(follow)

    // dispatch(followLoading())
    // dispatch(deletedLoading())
  };
  const getUserPosts = async () => {
    // if(isProfile){
      const res = await axios.get(`/post/${userId}`);
      setIsLoading(false);
      setPosts(res.data);
    // }else{
    //   fetchPosts()
    // }
   
    // dispatch(profileLoading());
    // dispatch(deletedLoading())
  };
  const buttonClicked = () => {
    setPosts(!posts);
  };

 
  useEffect(() => {
    if (loading) {
      fetchPosts();
      dispatch(setLoading());
    }
  }, [loading, posts]);



  
  useEffect(() => {
    if (deleted && isProfile) {
      getUserPosts();
      dispatch(deletedLoading());
    } else if (deleted) {
      fetchPosts();
      dispatch(deletedLoading());
    }
  }, [deleted, isProfile]);
  useEffect(() => {
    if (comment && isProfile) {

      getUserPosts();
      dispatch(commentLoading());
    } else if (comment) {
      fetchPosts();
      dispatch(commentLoading());
    }
  }, [comment, isProfile]);
  useEffect(() => {
    if (liked && isProfile) {

      getUserPosts();
      dispatch(likeLoading());
    } else if (liked) {
      fetchPosts();
      dispatch(likeLoading());
    }
  }, [liked, isProfile]);
  useEffect(()=>{
    if(follow && isProfile || isProfile ){
      getUserPosts()
    }else{
      fetchPosts()

    }
  },[follow,isProfile])
  useEffect(() => {
    if (isProfile===true) {
      getUserPosts();
    } else {
      fetchPosts();
    }
  }, [isProfile, userId, click]);
  // console.log(isProfile,'pro true');
  return (
    <>
      {isLoading ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
          </Box>
        </>
      ) : posts?.length === 0 ? (
        isProfile ? (
          <h6 style={{  variant: "body2",
          textAlign: "center", // Center-align the button
          marginTop: "20px",}}>No posts to show</h6>
        ) : (
          <h6 style={{  variant: "body2",
          textAlign: "center", // Center-align the button
          marginTop: "20px",}}>Follow some friends to see their posts</h6>
        )
      ) : (
        [...posts]
          .reverse()
          .map(
            ({
              _id,
              userId,
              description,
              userName,
              image,
              likes,
              comments,
              report,
              createdAt,
              adminDeleted
            }) => {
              if (!adminDeleted) { // Check if adminDeleted is false
                return (
                  <PostWidget
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    postCreatedAt={createdAt}
                    description={description}
                    name={userName}
                    image={image}
                    likes={likes}
                    getUserPosts={getUserPosts}
                    comments={comments}
                    buttonClicked={buttonClicked}
                    dp={dp}
                    report={report}
                    fetchPosts={fetchPosts}
                    isProfile={isProfile ? isProfile : false}
                    socket={socket}
                  />
                );
              } else {
                return null; // Skip rendering the PostWidget if adminDeleted is true
              }
            }
          )
      )}
    </>
  );
};

export default PostsWidget;
