import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PostAddIcon from "@mui/icons-material/PostAdd";
import image from "../../assets/circle-Up.png";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isSidebarOpen, closeSidebar, navigate }) => {
  const mode = useSelector((store) => store.theme.mode);

  const SidebarOptions = [
    {
      text: "Dashboard",
      icon: (
        <DashboardIcon
          sx={mode == "dark" ? { color: "white" } : { color: "black" }}
        />
      ),
      link: "/admin",
    },
    {
      text: "View Users",
      icon: (
        <GroupIcon
          sx={mode == "dark" ? { color: "white" } : { color: "black" }}
        />
      ),
      link: "/admin/view-users",
    },
    {
      text: "Reported Posts",
      icon: (
        <PostAddIcon
          sx={mode == "dark" ? { color: "white" } : { color: "black" }}
        />
      ),
      link: "/admin/reported-posts",
    },
  ];
  return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={closeSidebar}
      onOpen={() => {}}
    >
      <Box
        sx={{ width: 240 }}
        role="presentation"
        onClick={closeSidebar}
        onKeyDown={closeSidebar}
      >
        <IconButton onClick={closeSidebar}>
          <ChevronLeftIcon />
        </IconButton>
        {mode === "light" && (
          <img
            src={image}
            height="60px"
            style={{ marginLeft: "100px" }}
            width="80px"
            alt=""
          />
        )}
        <Divider />
        <List>
          {SidebarOptions.map((option, index) => (
            <ListItem button key={index} onClick={() => navigate(option.link)}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default Sidebar;
