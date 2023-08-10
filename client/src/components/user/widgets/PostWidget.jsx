/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  DeleteOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreHorizOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Popover,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../FlexBetween";
import Friend from "../../Friend";
import WidgetWrapper from "../../WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import axios from "../../../axios/axios";
import {
  commentLoading,
  deletePost,
  deletedLoading,
  likeLoading,
  setLoading,
  setUpdatedPost,
} from "../../../redux/postReducer";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  fetchPosts,
  getUserPosts,
  isProfile = true,
  postUserId,
  postCreatedAt,
  name,
  dp,
  description,
  userName,
  image,
  likes,
  comments,
  socket,
  report,
}) => {
  const navigate = useNavigate();
  const postTime = format(postCreatedAt);
  const [isComments, setIsComments] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [editDescription, setEditDescription] = useState(description);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { _id, firstName } = useSelector(
    (store) => store.user.payload?.userExist
  );
  const liked = likes.includes(_id);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const isProfilePost = useState(true);
  const open = Boolean(anchorEl);
  const [editLoad, setEditLoad] = useState(false);
  const [load, setLoad] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [error, setError] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditVisible(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteVisible(true);
    setAnchorEl(null);
  };

  const handleReportConfirm = async () => {
    setIsReportVisible(true);
    const res = await axios.put(`/${postId}/report-post`, {
      userId: _id,
      reason: reportReason,
    });
    if (res?.data == false) {
      setError(true);
    }
    if (res?.data != false) {
      dispatch(setUpdatedPost(res?.data));
    }
    setIsReportVisible(false);
    dispatch(deletedLoading());
    setReportReason("");
    setAnchorEl(null);
  };

  const handleSaveEdit = async () => {
    const updatedPost = {
      id: postId,
      text: editDescription,
    };
    const response = await axios.post("/edit_post", updatedPost);
    if (response.data) {
      setEditLoad(true);
      setIsEditVisible(false);
      dispatch(deletedLoading());
      setIsEditVisible(false);
      setEditDescription(description);
    }
  };

  const handleReportCancel = () => {
    setIsReportVisible(!isReportVisible);
    setReportReason("");
  };

  const handleDeleteCancel = () => {
    setIsDeleteVisible(false);
  };

  const handleDelete = async () => {
    // Perform delete action
    const res = await axios.delete(`/${postId}/post`);
    if (res.data.status) {
      // dispatch(deletePost(postId));
      setIsDeleteVisible(false);
      handleDeleteCancel();
      dispatch(deletedLoading());
      setLoad(true);
    }
  };

  const handleLike = async () => {
    console.log(postId, "get liked");
    const res = await axios.put(`/${postId}/like`, { userId: _id });
    console.log(res, "res");
    dispatch(likeLoading());
    socket.emit("sendNotification", {
      senderName: firstName,
      receiverId: postUserId,
      postId: postId,
      type: "liked",
    });
  };
  const handleUnLike = async () => {
    const res = await axios.put(`/${postId}/unLike`, { userId: _id });
    dispatch(likeLoading());
  };
  const isVideo = (fileName) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"];
    const extension = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase()
      .slice(0, 4);

    return videoExtensions.includes(extension);
  };
  const handleDeleteComment = async (index, userId) => {
    console.log(index, userId, "index");
    const data = await axios.put(`/:${postId}/delete-comment`, {
      userId: userId,
      index: index,
    });
    // dispatch({post:data.data})
    dispatch(likeLoading());
    setIsComments(!isComments);
  };
  const handleAddComment = async () => {
    console.log(postUserId, commentInput, "hi");
    const data = await axios.put(`/:${postId}/comment`, {
      userId: _id,
      comment: commentInput,
      firstName,
    });
    dispatch(setUpdatedPost({ post: data.data }));
    dispatch(commentLoading());
    setIsComments(!isComments);
    setCommentInput("");
    socket.emit("sendNotification", {
      senderName: firstName,
      receiverId: postUserId,
      postId: postId,
      type: "commented",
    });
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 2000); // 3000 milliseconds = 3 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <WidgetWrapper m="2rem 0">
      {error && (
        <Alert severity="success">
          <AlertTitle>Reported Successfully</AlertTitle>
          Report Successfully
        </Alert>
      )}
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={postTime}
        isProfile
        userPicturePath=""
        isProfilePost={isProfilePost}
        dp={dp}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {image?.map((name, index) => {
        return (
          <React.Fragment key={index}>
            {isVideo(name) ? (
              <video
                src={`${name}?t=${Date.now()}`}
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "0.75rem",
                  marginTop: "0.75rem",
                }}
              />
            ) : (
              <img
                src={`${name}`}
                alt={`post-image-${index}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "0.75rem",
                  marginTop: "0.75rem",
                }}
              />
            )}
          </React.Fragment>
        );
      })}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton>
              {liked ? (
                <FavoriteOutlined
                  sx={{ color: primary }}
                  onClick={handleUnLike}
                />
              ) : (
                <FavoriteBorderOutlined onClick={handleLike} />
              )}
            </IconButton>
            <Typography>{likes?.length}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <div>
          <IconButton>
            <MoreHorizOutlined
              onClick={handlePopoverOpen}
              aria-describedby="more-options"
            />
          </IconButton>
          <Popover
            id="more-options"
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {postUserId === _id ? (
              <Box p={2}>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDeleteConfirm} color="error">
                  Delete
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  onClick={handleReportConfirm}
                  sx={{ backgroundColor: "red" }}
                  // disabled={reportReason.trim() === ""}
                >
                  Report
                </Button>
              </Box>
            )}
          </Popover>
        </div>
      </FlexBetween>

      <Dialog open={isEditVisible} onClose={() => setIsEditVisible(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            label="Edit description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditVisible(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isReportVisible} onClose={handleReportCancel}>
        <DialogTitle>Report Post</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            label="Reason for reporting"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportCancel}>Cancel</Button>
          <Button
            onClick={handleReportConfirm}
            color="error"
            disabled={reportReason.trim() === ""}
          >
            Report
          </Button>
          {/* {
            error &&  alert('Already Reported')
          } */}
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteVisible} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map(({ userId, comment, firstName }, index) => (
            <React.Fragment key={index}>
              <Box>
                <Divider />
                <FlexBetween alignItems="center">
                  <Typography
                    onClick={() => navigate(`/profile/${userId}`)}
                    sx={{
                      "&:hover": {
                        color: "black",
                        cursor: "pointer",
                      },
                      color: main,
                      m: "0.5rem 0",
                      pl: "1rem",
                    }}
                  >
                    {firstName} : {comment}
                  </Typography>
                  {/* {userId === _id && ( */}
                  <IconButton
                    onClick={() => handleDeleteComment(index, userId)}
                    size="small"
                  >
                    <DeleteOutlined />
                  </IconButton>
                  {/* )} */}
                </FlexBetween>
              </Box>
              <Divider />
            </React.Fragment>
          ))}

          <Box display="flex" alignItems="center" mt="0.5rem">
            <TextField
              variant="outlined"
              fullWidth
              label="Add a comment..."
              size="small"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddComment}
              disabled={!commentInput.trim()}
            >
              Post
            </Button>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
