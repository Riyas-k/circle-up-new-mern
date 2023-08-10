/* eslint-disable react/prop-types */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import image from "../../assets/circle-Up.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../redux/themeSlice";
import dark from '../../assets/dark.png'

const AdminHeader = ({ toggleSidebar, handleLogout }) => {
  const mode = useSelector((store) => store.theme.mode);
  const dispatch = useDispatch();
  
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <AppBar position="relative" sx={{      backgroundColor: mode === "light" ? "white" : "black", }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleSidebar}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{color:mode === "light" ? "black" : "white" }} />
            </IconButton>
            <img src={mode==='light'?image:dark} height="60px" alt="" />
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                variant="h6"
                sx={{color:mode === "light" ? "black" : "white" }}
                noWrap ml="10px"
              >
                Admin
              </Typography>
            </Link>
          </div>
          {mode === "dark" ? (
            <LightModeIcon 
            sx={{color:mode === "light" ? "black" : "white",justifyContent:'center',cursor:"pointer" }}
              onClick={() => dispatch(setMode())}
            />
          ) : (
            <DarkModeIcon  sx={{color:mode === "light" ? "black" : "white",justifyContent:'center',cursor:"pointer" }} onClick={() => dispatch(setMode())} />
          )}
          <Button
            sx={{ color:mode === "light" ? "black" : "white", "&:hover": { background: "red" } }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default AdminHeader;
