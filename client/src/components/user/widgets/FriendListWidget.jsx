/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../Friend";
import WidgetWrapper from "../../WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../axios/axios";
import {
  followLoading,
  setFollowers,
  setFollowing,
  setFriendFollowers,
  setFriendFollowing,
} from "../../../redux/followReducer";

const FriendListWidget = ({
  userId,
  details,
  handleEffect,
  handleClick,
  isProfile=false,
}) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const [click, setClick] = useState(false);
  const [followers, setFollower] = useState([]);
  const [following, setFollowings] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const itemsPerRow = 2;
  const [followersToShow, setFollowersToShow] = useState(
    followers?.slice(0, itemsPerRow)
  );
  const [followingToShow, setFollowingToShow] = useState(
    following.slice(0, itemsPerRow)
  );
  const [suggestionsToShow, setSuggestionsToShow] = useState(
    suggestions.slice(0, itemsPerRow)
  );
  const id = useSelector((store) => store.follow?.user?.payload?.userExist._id);
  const follow = useSelector((store) => store?.follow.loading);
  // const [expanded, setExpanded] = useState(false);

  const loading = useSelector((store) => store?.follow?.loading);
  const getFriends = async () => {
    const followerData = await axios.get(`/${userId}/follower`);
    setFollower(followerData?.data);
    const followingData = await axios.get(`/${userId}/following`);
    setFollowings(followingData?.data);
    dispatch(followLoading());

    if (id == userId) {
      dispatch(setFollowers({ followers: followerData?.data }));
      dispatch(setFollowing({ following: followingData?.data }));
    } else {
      dispatch(setFriendFollowers({ followers: followerData?.data }));
      dispatch(setFriendFollowing({ following: followingData?.data }));
    }
  };
  useEffect(() => {
    getFriends();
  }, []);

  const handleRequest = () => {
    setClick(!click);
    handleEffect();
  };

  const getSuggestions = async () => {
    const { data } = await axios.get(`/find-suggest/${id}`);
    if (data) {
      setSuggestions(data);
      // dispatch(followLoading());
    }
  };
  useEffect(() => {
    if (loading) getFriends();
  }, [loading]);
  useEffect(() => {
    getSuggestions();
  }, []);


  useEffect(() => {
    if (expanded) {
      setFollowersToShow(followers);
      setFollowingToShow(following);
      setSuggestionsToShow(suggestions);
    } else {
      setFollowersToShow(followers.slice(0, itemsPerRow));
      setFollowingToShow(following.slice(0, itemsPerRow));
      setSuggestionsToShow(suggestions.slice(0, itemsPerRow));
    }
  }, [followers, following, suggestions, expanded]);
  const handleViewMore = () => {
    setExpanded(!expanded);
  };
  useEffect(()=>{
   if(follow){
    getSuggestions();
   }
  },[id,follow])
  useEffect(() => {
    if (follow) {
     
      getFriends();
    }
  }, [id]);

  return (
    <>
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Followers
        </Typography>
        {followers?.length == 0 && <p>No followers</p>}
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {followersToShow?.map((state) => {
            return (
              <Friend
                key={state?._id}
                following={following}
                followers={followers}
                friendId={state?._id}
                subtitle={state?.UserName}
                dp={state?.dp}
                name={state?.firstName}
                handleRequest={handleRequest}
                handleClick={handleClick}
              />
            );
          })}
        </Box>
        {followers.length > itemsPerRow && !expanded && (
          <Typography
            sx={{
              cursor: "pointer",
              color: palette.primary.main,
              variant: "body2",
              textAlign: "center", // Center-align the button
              marginTop: "20px", // Add margin-top
            }}
            onClick={handleViewMore}
            color={palette.primary.main}
            variant="body2"
          >
            View More
          </Typography>
        )}
      </WidgetWrapper>
      <WidgetWrapper style={{ marginTop: "20px" }}>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Following
        </Typography>
       
        {following?.length == 0 && <p>No following to display</p>}
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {followingToShow?.map((state) => {
            return (
              <Friend
                friendId={state?._id}
                details={details}
                key={state?._id}
                subtitle={state?.UserName}
                dp={state?.dp}
                name={state?.firstName}
                handleRequest={handleRequest}
                handleClick={handleClick}
              />
            );
          })}
        </Box>
        {following.length > itemsPerRow && !expanded && (
          <Typography
            sx={{
              cursor: "pointer",
              color: palette.primary.main,
              variant: "body2",
              textAlign: "center", // Center-align the button
              marginTop: "20px", // Add margin-top
            }}
            onClick={handleViewMore}
            color={palette.primary.main}
            variant="body2"
          >
            View More
          </Typography>
        )}
      </WidgetWrapper>
      {
          !isProfile && (
            <WidgetWrapper style={{ marginTop: "20px" }}>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
              Suggestions
            </Typography>
            {suggestions?.length == 0 && <p>No Suggestions.</p>}
            <Box display="flex" flexDirection="column" gap="1.5rem">
              {suggestionsToShow?.map((state) => {
                return (
                  <Friend
                    friendId={state?._id}
                    details={details}
                    key={state?._id}
                    subtitle={state?.UserName}
                    dp={state?.dp}
                    name={state?.firstName}
                    handleRequest={handleRequest}
                    handleClick={handleClick}
                  />
                );
              })}
            </Box>
            {suggestions.length > itemsPerRow && !expanded && (
              <Typography
                sx={{
                  cursor: "pointer",
                  color: palette.primary.main,
                  variant: "body2",
                  textAlign: "center", // Center-align the button
                  marginTop: "20px", // Add margin-top
                }}
                onClick={handleViewMore}
                color={palette.primary.main}
                variant="body2"
              >
                View More
              </Typography>
            )}
          </WidgetWrapper>
          )
        }
     
    </>
  );
};

export default FriendListWidget;
