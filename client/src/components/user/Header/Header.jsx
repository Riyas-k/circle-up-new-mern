/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../redux/singlereducer";
import image from "../../../assets/circle-Up.png";
import { Badge, Button, Popover, Stack, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setMode } from "../../../redux/themeSlice";
import dark from "../../../assets/dark.png";
import debounce from "lodash.debounce";
import axios from "../../../axios/axios";
import { useTheme } from "@emotion/react";
import { clearUserLogout } from "../../../redux/followReducer";
import { Notifications } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  border: `1px solid ${theme.palette.mode === "dark" ? "grey" : "black"}`, // Add border property
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ socket }) {
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const theme = useTheme();
  const user = useSelector((state) => state.user.payload);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const MySwal = withReactContent(Swal);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const mode = useSelector((store) => store.theme.mode);
  const iconColor = mode === "dark" ? "white" : "black";
  const dispatch = useDispatch();

  const openNotificationPopover = (e) => {
    setNotificationAnchorEl(e.currentTarget);
  };
  const closeNotificationPopover = () => {
    setNotificationAnchorEl(null);
  };
  // const [text,setText] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isNotificationPopoverOpen = Boolean(notificationAnchorEl);
  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === "liked") {
      action = "liked";
    } else if (type === "commented") {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} on your post`}</span>
    );
  };
  React.useEffect(() => {
    socket?.on("getNotifications", (data) => {
      const isDuplicate = notifications.some(
        (item) => item.postId == data.postId
      );
      if (!isDuplicate) {
        setNotifications((prev) => [...prev, data]);
      }
    });
  }, [socket]);
  const unreadNotifications = notifications.length > 0;

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "To Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete operation
        localStorage.removeItem("token");
        dispatch(clearUser());
        dispatch(clearUserLogout());
        navigate("/sign-in");
      }
    });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "30px" }}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
        Logout
      </MenuItem>
    </Menu>
  );
  const handleQueryChange = debounce(async (newQuery) => {
    try {
      console.log(newQuery, "mol");
      const response = await axios.get(`/${newQuery}/search`);
      console.log(response, "header search");
      setSuggestions(response.data.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      // setLoading(false);
    }
  }, 200);

  const searchUser = (event) => {
    const inputValue = event.target.value;
    handleQueryChange(inputValue);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: mode === "light" ? "white" : "black",
          color: mode === "light" ? "black" : "white",
          py: 1,
        }}
      >
        <Toolbar>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Box>
              <img
                src={mode === "light" ? image : dark}
                height="60px"
                style={{ marginRight: "10px" }}
                alt="logo"
              />
            </Box>
          </Link>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onKeyUp={searchUser}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {Boolean(suggestions?.length) && (
            <Box
              sx={{
                position: "absolute",
                top: "80%",
                left: "120px",
                width: "18%",
                backgroundColor: "white",
                color: "black",
                borderRadius: "0.5rem",
                boxShadow: theme.shadows[1],
                mt: "0.25rem",
                zIndex: 1,
                overflowY: "auto",
              }}
            >
              {suggestions?.map((suggestion) => (
                <Typography
                  key={suggestion._id}
                  onClick={() => {
                    navigate(`/profile/${suggestion._id}`);
                    // navigate(0); // to change url on friends friends profile
                  }}
                  sx={{
                    py: "0.5rem",
                    px: "1rem",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "grey",
                      color: theme.palette.background.default,
                    },
                  }}
                >
                  {suggestion.UserName}
                </Typography>
              ))}
            </Box>
          )}
          {/* NOTIFICATION POPOVER */}
          <Popover
            open={isNotificationPopoverOpen}
            anchorEl={notificationAnchorEl}
            onClose={closeNotificationPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ p: "1rem" }}>
              {notifications.length === 0 ? (
                <Typography>No notifications</Typography>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {notifications.map((notification) => {
                    // if (index % 2 === 1) {
                    //   // Skip odd indexes
                    //   return null;
                    // }

                    return (
                      <Typography
                        key={notification.id}
                        style={{ marginBottom: "0.5rem" }}
                      >
                        {displayNotification(notification)}
                      </Typography>
                    );
                  })}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ marginRight: "0.5rem", color: "gray" }}
                    >
                      {notifications.length} unread notifications
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setNotifications([])}
                      sx={{
                        backgroundColor: "#00D5FA",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#00353F",
                        },
                      }}
                    >
                      Clear Notifications
                    </Button>
                  </div>
                </div>
              )}
            </Box>
          </Popover>

          <Box sx={{ flexGrow: 1 }} />

          {mode === "dark" ? (
            <Tooltip title="Light Mode" placement="bottom">
              <LightModeIcon
                sx={{
                  color: mode === "light" ? "black" : "white",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(setMode())}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Dark Mode" placement="bottom">
              <DarkModeIcon
                sx={{
                  color: mode === "light" ? "black" : "white",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(setMode())}
              />
            </Tooltip>
          )}

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            sx={{ mt: -0 }}
          >
            <Tooltip title="Messages" placement="bottom">
              <Link to="/chat">
                <MessageIcon sx={{ color: iconColor, marginTop: "-6px",margin:'px' }} />
              </Link>
            </Tooltip>
          </IconButton>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                marginTop: "-10px",
                marginLeft: "2px",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Tooltip title="Notification" placement="bottom">
                <IconButton
                  sx={{  color: mode === "light" ? "black" : "white",
                  cursor: "pointer",
                  fontSize: "25px",marginTop:'5px' }}
                  onClick={openNotificationPopover}
                >
                  {unreadNotifications ? (
                    <Badge badgeContent={notifications?.length}>
                      <Notifications
                       
                      />
                    </Badge>
                  ) : (
                    <Notifications  />
                  )}
                </IconButton>
              </Tooltip>
            </IconButton>
          </Box>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
            <Typography variant="body1" component="span" marginLeft={1}>
              {user.firstName || user.userExist.firstName}
            </Typography>
          </IconButton>

          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Stack>
  );
}
