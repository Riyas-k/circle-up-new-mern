import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Label,
} from "recharts";
import axios from "../../axios/axios";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import Footer from "../../components/admin/Footer";
import Chart from "../../components/admin/chart/chart";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    height: 200,
    backgroundColor: "#00D5FA", // Custom primary color
    color: "#FFFFFF", // Custom text color
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: "#00353F",
    },
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  value: {
    fontWeight: 500,
  },
  chartContainer: {
    height: 300,
    marginTop: theme.spacing(2),
  },
}));

import React from "react";
import { set } from "lodash";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { clearAdmin } from "../../redux/adminAuthReducer";

const AdminHome = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/admin/view-users");
        setUsers(res.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getAllPosts = async () => {
      const result = await axios.get("/admin/view-posts");
      setPosts(result.data);
    };
    getUsers();
    getAllPosts();
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const dispatch = useDispatch();
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
        localStorage.removeItem("admin");
        dispatch(clearAdmin());
        navigate("/admin/login");
      }
    });
  };
  const filteredUsers = users?.filter((user) => user?.report?.length > 0);
  const filteredPosts = posts?.filter((post) => post?.report?.length > 0);
  const userRegistrations = users.reduce((acc, user) => {
    const registrationDate = new Date(user?.createdAt);
    const dayOfWeek = registrationDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {});
  // Convert user registrations to an array of objects for recharts
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const userRegistrationData = daysOfWeek.map((day) => ({
    day,
    users: userRegistrations[day] || 0,
  }));
  const postsPerDayData = posts.reduce((acc, post) => {
    const postDate = new Date(post.createdAt);
    const dayOfWeek = postDate.toLocaleDateString("en-US", { weekday: "long" });
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {});
  const postsData = daysOfWeek.map((day) => ({
    day,
    posts: postsPerDayData[day] || 0,
  }));
  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <>
      <AdminHeader toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        navigate={handleNavigate} // Pass the handleNavigate function
      />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h2" className={classes.title}>
                Total Users
              </Typography>
              <Typography variant="h4" className={classes.value}>
                {users?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h2" className={classes.title}>
                Total Posts
              </Typography>
              <Typography variant="h4" className={classes.value}>
                {posts.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h2" className={classes.title}>
                Total Reports
              </Typography>
              <Typography variant="h4" className={classes.value}>
                {filteredPosts?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Typography variant="h5" component="h2" className={classes.title}>
                Total User Reports
              </Typography>
              <Typography variant="h4" className={classes.value}>
                {filteredUsers?.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.chartContainer}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
                >
                  Users Registration per Day
                </Typography>
              </div>
              <ResponsiveContainer>
                <BarChart data={userRegistrationData}>
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    labelStyle={{ fontSize: 14 }}
                  />
                  <Legend />
                  <Bar
                    dataKey="users"
                    fill="#00D5FA"
                    barSize={40}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={classes.chartContainer}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
                >
                  Number of Posts per Day
                </Typography>
              </div>
              <ResponsiveContainer>
                <BarChart data={postsData}>
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    labelStyle={{ fontSize: 14 }}
                  />
                  <Legend />
                  <Bar
                    dataKey="posts"
                    fill="#6A4CAA"
                    barSize={40}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={5} />
        <Paper className={classes.chartContainer}>
            {
                users.length >0 && 
          <Chart users={users } />
            }
        </Paper>
      </div>
      <Footer />
    </>
  );
};

export default AdminHome;
