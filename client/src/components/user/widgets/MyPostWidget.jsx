/* eslint-disable react/prop-types */
import {
  EditOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "../../FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../UserImage";
import WidgetWrapper from "../../WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios/axios";
import { uploadFile } from "../../../firebase/config";
import { setLoading, setPost } from "../../../redux/postReducer";
// import { useNavigate } from "react-router-dom";
//posts from redux

const MyPostWidget = ({ dp, details }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [text, setText] = useState(null);
  const { palette } = useTheme();

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const user = useSelector((store) => store.user.payload.userExist);

  useEffect(() => {
    setProfile(dp);
  }, [dp]);

  //api call

  const handlePost = async (e) => {
    e.preventDefault();
    if (!image && !video) {
      return alert("pls choose image or video");
    }
    const newPost = {
      text,
      ...(image && { image: image.name }),
      ...(video && { video: video.name }),
    };
    // setPosts([...posts, newPost]);
    //     console.log(newPost);
    const userId = user._id;
    if (image) {
      // const imageContentType = "image/jpeg";
      await uploadFile(image).then((res) => {
        newPost.image = res;
        newPost.userName = user.UserName;
      });

      await axios.post(`/${userId}`, newPost);
      dispatch(setLoading());
      setIsImage(false);
      setIsVideo(false);
      setImage(null);
      setText("");
    } else if (video) {
      // const videoContentType = "video/mp4";
      await uploadFile(video).then(async (res) => {
        newPost.image = res;
        newPost.userName = user.UserName;
        await axios.post(`/${userId}`, newPost);
        dispatch(setLoading());
        setIsImage(false);
        setIsVideo(false);
        setVideo(null);
        setText("");
      });
    }
  };

  return (
    <WidgetWrapper boxShadow="10">
      <FlexBetween gap="1.5rem">
        {details ? (
          <UserImage
            image={
              details?.dp ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
          />
        ) : (
          <UserImage image="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
        )}
        <InputBase
          placeholder="Write Something..."
          onChange={(e) => {
            const values = e.target.value;
            if (!values.startsWith(" ")) {
              setText(values);
            }
          }}
          value={text}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1 rem"
        >
          <Dropzone
            accept=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles, rejectedFiles) => {
              const isValidFileType = acceptedFiles.every((file) => {
                const fileType = file.type;
                return fileType === "image/jpeg" || fileType === "image/png";
              });

              if (!isValidFileType) {
                // Show error message for invalid file types
                alert("Please select a valid image file (jpg, jpeg, png).");
              } else {
                // Process the accepted file (in this case, set the image state)
                setImage(acceptedFiles[0]);
                console.log(image, "god");
                setVideo(false);
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  width="100%"
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  {/* <input {...getInputProps} /> */}
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      {isVideo && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1 rem"
        >
          <Dropzone
            accept=".mp4,.avi,.mov"
            multiple={false}
            onDrop={(acceptedFiles, rejectedFiles) => {
              const isValidFileType = acceptedFiles.every((file) => {
                const fileType = file.type;
                return (
                  fileType === "video/mp4" ||
                  fileType === "video/avi" ||
                  fileType === "video/quicktime"
                );
              });

              if (!isValidFileType) {
                // Show error message for invalid file types
                alert("Please select a valid video file (mp4, avi, mov).");
              } else {
                // Process the accepted file (in this case, set the video state)
                setVideo(acceptedFiles[0]);
                // setImage(false)
                console.log(video, "hoi");
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  width="100%"
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  {/* <input {...getInputProps} /> */}
                  {!video ? (
                    <p>Add video Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{video.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {video && (
                  <IconButton
                    onClick={() => setVideo(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {!isImage && (
          <FlexBetween
            gap="0.25rem"
            onClick={() => {
              setIsImage(!image);
              setIsVideo(video);
            }}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Image</Typography>
          </FlexBetween>
        )}

        {!isVideo && (
          <FlexBetween
            gap="0.25rem"
            onClick={() => {
              setIsVideo(!video);
              setIsImage(image);
            }}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            <GifBoxOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Video
            </Typography>
          </FlexBetween>
        )}
        {/* <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attach</Typography>
            </FlexBetween>{" "}
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween> */}

        {/* ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )} */}
        <Button
          disabled={!text}
          onClick={(e) => handlePost(e)}
          sx={{
            color: "white",
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": { cursor: "pointer", background: "green" },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
