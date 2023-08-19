/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios/axios";
import {
  commentLoading,
  deletedLoading,
  likeLoading,
  setLoading,
  setPost,
} from "../../../redux/postReducer";
import PostWidget from "./PostWidget";
import { Box, LinearProgress, Pagination } from "@mui/material";

const PostsWidget = ({ click, isProfile, userId, dp, socket }) => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState([]);
  let loading = useSelector((store) => store.post.loading);
  const deleted = useSelector((store) => store.post.deleted);
  const comment = useSelector((store) => store.post.comment);
  const liked = useSelector((store) => store.post.liked);
  // const data = useSelector((store) => store.post);
  const follow = useSelector((store) => store?.follow?.loading);
  const fetchPosts = async () => {
    let click = true;
    const res = await axios.get(`/posts/${userId}`);
    dispatch(setPost(res.data));
    // setIsLoading(false);
    setPosts(res.data);
    if (!loading && click) {
      dispatch(setLoading());
      click = false;
    }
  };
  const getUserPosts = async () => {
    let run = true;
    const res = await axios.get(`/post/${userId}`);
    // setIsLoading(false);
    setPosts(res.data);
    if (loading && run) {
      dispatch(setLoading());
      run = false;
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2; // Change the number of posts per page here

  // Pagination Logic
  const reversedPosts = [...posts].reverse(); // Create a reversed copy of the posts array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reversedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const buttonClicked = () => {
    setPosts(!posts);
  };

  useEffect(() => {
    if (loading && !isProfile) {
      fetchPosts();
      // dispatch(setLoading());
    } else if (!loading && isProfile) {
      getUserPosts();
      // dispatch(setLoading());
    }
  }, [loading, posts, isProfile]);

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
  useEffect(() => {
    if (isProfile || (follow && isProfile)) {
      getUserPosts();
    } else {
      fetchPosts();
    }
  }, [follow, isProfile]);
  useEffect(() => {
    if (isProfile === true) {
      getUserPosts();
    } else {
      fetchPosts();
    }
  }, [isProfile, userId, click]);
  // console.log(isProfile,'pro true');
  return (
    <>
      {currentPosts.length === 0 ? (
        isProfile ? (
          <h6
            style={{
              variant: "body2",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            No posts to show
          </h6>
        ) : (
          <h6
            style={{
              variant: "body2",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Follow some friends to see their posts
          </h6>
        )
      ) : (
        currentPosts.map(
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
            adminDeleted,
          }) => {
            if (!adminDeleted) {
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
              return null;
            }
          }
        )
      )}
      {currentPosts.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            page={currentPage}
            variant="outlined"
            onChange={(event, page) => paginate(page)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default PostsWidget;
