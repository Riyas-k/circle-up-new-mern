/* eslint-disable react/prop-types */
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { followLoading } from "../redux/followReducer";

const Friend = ({
  friendId,
  name,
  subtitle,
  dp,
  details,
  isProfile,
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [user, setUser] = useState([]);
  const userId = useSelector((store) => store.user?.payload?.userExist._id);
  const [openDialog, setOpenDialog] = useState(false);

  const isFollowingData = useSelector((store) => store?.follow?.following);
  const following = isFollowingData?.find(
    (following) => following._id === friendId
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getUser = async () => {
    const data = await axios.get(`/${friendId}`);
    setUser(data.data);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId]);

  const handleFollow = async () => {
    await axios.put(`/${userId}/follow`, { id: friendId }).then((res) => {
      console.log("res", res);
      if (res.data) {
        dispatch(followLoading());
      }
    });
  };

  const handleUnFollow = () => {
    handleOpenDialog();
  };

  const handleConfirmUnfollow = async () => {
    handleCloseDialog();
    await axios.put(`/${userId}/unFollow`, { id: friendId }).then((res) => {
      console.log(res, "jo");
      if (res.data) {
        dispatch(followLoading());
      }
    });
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        {user[0]?.dp || dp ? (
          <UserImage
            image={
              user[0]?.dp ||
              dp ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
          />
        ) : (
          <UserImage
            friendId={friendId}
            image="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          />
        )}
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isProfile && userId !== friendId ? (
        following || isProfile ? (
          <PersonRemoveOutlined
            sx={{ color: primaryDark, cursor: "pointer" }}
            onClick={handleUnFollow}
          />
        ) : (
          <PersonAddOutlined
            sx={{ color: primaryDark, cursor: "pointer" }}
            onClick={handleFollow}
          />
        )
      ) : null}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography>
            Are you sure you want to unfollow {name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUnfollow} color="primary">
            Unfollow
          </Button>
        </DialogActions>
      </Dialog>
    </FlexBetween>
  );
};

export default Friend;
