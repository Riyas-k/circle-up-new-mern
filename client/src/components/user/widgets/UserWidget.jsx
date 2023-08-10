/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  MessageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Modal,
  TextField,
  Button,
  Grid,
  IconButton,
  InputLabel,
} from "@mui/material";
import UserImage from "../../UserImage";
import FlexBetween from "../../FlexBetween";
import WidgetWrapper from "../../WidgetWrapper";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import { styled } from "@mui/system";
import Dropzone from "react-dropzone";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios/axios";
import { uploadFile } from "../../../firebase/config";
import { setUserDetails } from "../../../redux/singlereducer";
import { useNavigate, useParams } from "react-router-dom";
import {
  setImageProfile,
  setUpdatedDetails,
} from "../../../redux/updatedReducer";
import { profileLoading, setLoading } from "../../../redux/postReducer";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    background-color: ${({ theme }) =>
      theme.mode === "dark" ? "black" : "white"};
    border-radius: 4px;
    outline: none;
    padding: 1rem;
    width: 400px; /* Adjust the width as needed */
    color: ${({ theme }) => (theme.mode === "dark" ? "white" : "black")};
    border: 1px solid
      ${({ theme }) => (theme.mode === "dark" ? "black" : "white")};
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .modal-input {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid
      ${({ theme }) => {
        theme.mode === "dark" ? "white" : "black";
      }};
    border-radius: 4px;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
  }

  .modal-button {
    margin-left: 1rem;
  }

  .error-message {
    color: red;
    font-size: 0.6rem;
  }
`;

const UserWidget = ({ userId, checkId, isProfile,details }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  // const [display,setDisplay] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState([]);
  const profile = useSelector((store) => store.post.profile);
  const isFollowingData = useSelector((store) => store?.follow?.following);
  const currentId = useSelector((store)=>store.user?.payload?.userExist?._id)
  const following = isFollowingData?.find(
    (following) => following._id === userId
  );
  const fetchUser = async () => {
    await axios.get(`/${userId}/user`).then((res) => {
      setUser(res.data);
      dispatch(setImageProfile(res?.data?.dp));
      if (profile) {
        dispatch(profileLoading());
      }
    });
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);

  const { palette } = useTheme();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setImage([]);
    setOpenModal(false);
  };
  useEffect(() => {
    if (profile) {
      fetchUser();
    }
  }, [profile, dispatch, userId]);
  const handleSaveChanges = async (values) => {
    try {
      if (!image.length == 0) {
        // const imageContentType = "image/jpeg";
        let data = await uploadFile(image[0]);
        if (data) {
          values.dp = data;
          // user.userExist.dp = profile
        }
        values.dp = data;
        const response = await axios.put(`/${userId}`, values);
        const result = localStorage.setItem("details", response.data.userExist);
        console.log(result, "image");
        setUser(response.data.userExist);
        dispatch(setUserDetails({ payload: response.data }));
        dispatch(setUpdatedDetails({ payload: response.data.userExist }));
        dispatch(profileLoading());
        // dispatch(setLoading())
        // setDataUser();
        handleCloseModal();
      } else {
        const response = await axios.put(`/${userId}`, values);
        localStorage.setItem("details", JSON.stringify(response.data));
        const result = JSON.parse(localStorage.getItem("details"));
        if (result) {
          localStorage.removeItem("details");
          localStorage.setItem("details", JSON.stringify(result.userExist));
          dispatch(setUserDetails({ payload: result }));
          setUserData(result);
          dispatch(profileLoading());
          handleCloseModal();
        } else {
          dispatch(profileLoading());
          setUserData(result);
          handleCloseModal();
        }
        setUserData(result);
        setUser(result);
        // console.log(user,'user');
        dispatch(setUserDetails({ payload: result }));
        // setDataUser();
        dispatch(profileLoading());
        handleCloseModal();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    location: Yup.string().required("Location is required"),
    bio: Yup.string().required("Bio is required"),
  });
  const mode = useSelector((store) => store.theme);
  useEffect(() => {
    handleCloseModal();
  }, [user]);
  const handleMessage = async()=>{
    const chat =  await axios.post('/chat',{
      senderId:currentId,
      receiverId:userId
    });
    if(chat){
      navigate('/chat')
    }
  }
  return (
    <WidgetWrapper boxShadow="5">
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        // onClick={() => navigate(`/profile/`)}
      >
        <FlexBetween
          gap="1rem"
          onClick={() => {
            navigate(`/profile/${userId}`);
            // navigate(0); // to change url on friends friends profile
          }}
        >
            {user?.dp || user?.userExist?.dp ? (
          <UserImage image={ user?.dp || user?.userExist?.dp || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" } />
        ) : (
          <UserImage image="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
        )}
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: "green",
                  cursor: "pointer",
                },
              }}
            >
              {user?.UserName || user?.userExist?.UserName}
            </Typography>

            <Typography color={medium}>
              {user?.firstName || user?.userExist?.firstName}
            </Typography>
          </Box>
        </FlexBetween>
        {isProfile && userId == following?._id && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* {
              currentId !== userId ?
              <Button variant='outlined' onClick={{}}>
              { following  ? "Unfollow" : "Follow" }
            </Button>
            : null
            } */}
           
            {following?._id && userId  && (
              <Button
                variant='outlined'
                startIcon={<MessageOutlined />}
                onClick={handleMessage}
                sx={{ marginTop: "0.5rem" }}
              >
                Message
              </Button>
            )}
          </Box>
        )}
        {checkId && (
          <ManageAccountsOutlined
            sx={{ cursor: "pointer" }}
            onClick={handleOpenModal}
          />
        )}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>
            {user?.location || user?.userExist?.location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>
            {user?.bio || user?.userExist?.bio}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Followers</Typography>
          <Typography color={main} fontWeight="500">
            {user?.followers?.length}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Following</Typography>
          <Typography color={main} fontWeight="500">
            {user?.following?.length}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FacebookRoundedIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Facebook
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <InstagramIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Instagram
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>

      {/* Update User Modal */}
      <StyledModal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ boxShadow: "10" }}
        theme={mode}
      >
        <div className="modal-content">
          <p>Edit Profile</p>
          <Formik
            initialValues={{
              username: user?.userExist?.UserName || user?.UserName || "",
              name:
                user?.userExist?.firstName ||
                user?.firstName ||
                user?.firstName ||
                "",
              phoneNumber: user?.userExist?.phone || user?.phone || "",
              email: user?.userExist?.email || user?.email || "",
              location:
                user?.userExist?.location ||
                userData?.location ||
                user?.location ||
                "",
              bio: user?.userExist?.bio || userData?.bio || user?.bio || "",
              // dp: user?.userExist?.dp || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <TextField
                      className="modal-input"
                      name="username"
                      fullWidth
                      variant="outlined"
                      value={values.username}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextField
                      className="modal-input"
                      name="name"
                      fullWidth
                      variant="outlined"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                    <TextField
                      className="modal-input"
                      name="phoneNumber"
                      fullWidth
                      variant="outlined"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextField
                      className="modal-input"
                      name="email"
                      fullWidth
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="location">Location</InputLabel>
                    <TextField
                      className="modal-input"
                      name="location"
                      fullWidth
                      variant="outlined"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="bio">Bio</InputLabel>
                    <TextField
                      className="modal-input"
                      name="bio"
                      fullWidth
                      multiline
                      rows={1}
                      variant="outlined"
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="error-message"
                    />
                  </Grid>
                </Grid>
                <Dropzone
                  accept=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles, rejectedFiles) => {
                    const isValidFileType = acceptedFiles.every((file) => {
                      const fileType = file.type;
                      return (
                        fileType === "image/jpeg" || fileType === "image/png"
                      );
                    });
                    console.log(isValidFileType);
                    if (!isValidFileType) {
                      // Show error message for invalid file types
                      alert(
                        "Please select a valid image file (jpg, jpeg, png)."
                      );
                    } else {
                      // Process the accepted file (in this case, set the image state)
                      console.log(acceptedFiles, "files");
                      setImage(acceptedFiles);
                    }
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} name="file" type="file" />
                      <Box
                        border={`2px dashed ${palette.primary.main}`}
                        width="100%"
                        textAlign="center"
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        {image.length <= 0 ? (
                          <p>Upload profile picture</p>
                        ) : (
                          <FlexBetween>
                            <Typography value={values?.dp}>
                              {image[0].path}
                            </Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                      {user?.dp && (
                        <IconButton sx={{ width: "15%" }}></IconButton>
                      )}
                    </div>
                  )}
                </Dropzone>

                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="modal-button"
                >
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </StyledModal>
    </WidgetWrapper>
  );
};

export default UserWidget;
