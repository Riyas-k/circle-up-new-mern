import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin } from "../../redux/adminAuthReducer";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Paper,
  Skeleton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/admin/Footer";
import axios from "../../axios/axios";
import CancelIcon from "@mui/icons-material/Cancel";

// Mocked data for demonstration
const ReportedPosts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const postPage = 1;
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);
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
        dispatch(clearAdmin());
        navigate("/admin/login");
      }
    });
  };

  const handleNavigate = (link) => {
    navigate(link);
  };
  // const data = useSelector((store) => store.post);
  const getPost = async () => {
    const post = await axios.get("/admin/reported-posts");
    setPosts(post.data);
  };

  useEffect(() => {
    getPost();
  }, []);
  // If the user clicks on the Confirm button, proceed with the removal
  const handleDelete = async (postId) => {
    // Show the confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel", // Display "Cancel" for the Cancel button
      reverseButtons: true, // Show the Confirm button on the left and Cancel button on the right
    });

    if (result.isConfirmed) {
      const res = await axios.put(`/admin/confirm-report/${postId}`);
      console.log(res, "data delelted seeet");
      getPost()
      // setSuccess
    }
  };
  const handleRemove = async (postId, index) => {
    // Show the confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel", // Display "Cancel" for the Cancel button
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const res = await axios.put(`/admin/reported-remove`, {
        postId: postId,
        index: index,
      });
      if (res.data) {
        getPost();
      }
    }
  };
  const reportedPosts = posts?.filter((post) => post?.report?.length !== 0);
  const startIndex = (page - 1) * postPage;
  const endIndex = startIndex + postPage;
  const currentPosts = reportedPosts.slice(startIndex, endIndex);
  return (
    <>
      <AdminHeader toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        navigate={handleNavigate} // Pass the handleNavigate function
      />
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reported Posts
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ "@media (max-width: 600px)": { display: "none" } }}
                >
                  No
                </TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Post Content</TableCell>
                <TableCell>Date Reported</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportedPosts?.length !== 0 ? (
                currentPosts?.map((post, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        sx={{
                          "@media (max-width: 600px)": { display: "none" },
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>{post?.comments[0]?.firstName}</TableCell>
                      <TableCell>{post?.report[0]?.reason}</TableCell>
                      <TableCell>
                        <img
                          src={post?.image[0]}
                          alt="Post"
                          style={{ width: "100px", height: "auto" }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(post?.updatedAt).toLocaleDateString("en-US")}
                      </TableCell>
                      <TableCell>
                        {post.adminDeleted ? (
                          <CheckCircleIcon style={{ color: "green" }} />
                        ) : (
                          <>
                            <IconButton color="error" aria-label="Delete">
                              <DeleteIcon
                                onClick={() => handleDelete(post?._id)}
                              />
                            </IconButton>
                            <IconButton aria-label="Delete">
                              <CancelIcon
                                onClick={() => handleRemove(post?._id, index)}
                              />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <h5
                      style={{
                        variant: "body2",
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      No reported posts found.
                    </h5>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil(reportedPosts?.length / postPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ReportedPosts;
