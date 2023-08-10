import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading";
import { blockUser, setUsers, unblockUser } from "../../redux/userSlice";
import { clearAdmin } from "../../redux/adminAuthReducer";
import Footer from "../../components/admin/Footer";
import { Pagination } from "@mui/material";
import { setBlockLoading, setUserLoading } from "../../redux/themeSlice";

const ViewUsersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUser] = useState([]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const userPage = 3;
  const loading = useSelector((store)=>store.theme.userLoading)
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/admin/view-users");
      // dispatch(setUsers({payload:response.data.data}))
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const startIndex = (page - 1) * userPage;
  const endIndex = startIndex + userPage;
  const currentUsers = users.slice(startIndex, endIndex);

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
 

  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleBlock = (userId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "To block!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "block",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`/admin/block/${userId}`);
          // const updatedUser = response.data.status;
          // dispatch(blockUser({ userId, isBlock: updatedUser.isBlock }));
          dispatch(setUserLoading())
          dispatch(setBlockLoading())
          await fetchAllUsers();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleUnblock = (userId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "To unblock!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "unblock",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-success",
        cancelButton: "btn bg-success",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`/admin/unblock/${userId}`);
          // const updatedUser = response.data.status;
          dispatch(setUserLoading())
          dispatch(setBlockLoading())
          // dispatch(unblockUser({ userId, isBlock: updatedUser.isBlock }));
          await fetchAllUsers();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  React.useLayoutEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(()=>{
    if(loading){
      fetchAllUsers()
      dispatch(setUserLoading())
    }
  },[loading])

  return (
    <>
      {users.length === 0 ? (
        <Loading />
      ) : (
        <>
          <AdminHeader
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
          />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
            navigate={handleNavigate}
          />
          <main>
            <Box sx={{ p: 1 }}>
              <Box sx={{ textAlign: "center", m: 3 }}>
                <Typography variant="h5" gutterBottom>
                  View Users
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          "@media (max-width: 600px)": { display: "none" },
                        }}
                      >
                        No
                      </TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentUsers?.map((user, index) => (
                      <TableRow key={user?._id}>
                        <TableCell
                          sx={{
                            "@media (max-width: 600px)": { display: "none" },
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>{user?.UserName}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.phone}</TableCell>

                        <TableCell align="center">
                          {user?.isBlock ? (
                            <Button
                              variant="contained"
                              color={"success"}
                              onClick={() => handleUnblock(user?._id)}
                            >
                              Un Block
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color={"error"}
                              onClick={() => handleBlock(user?._id)}
                            >
                              Block
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={Math.ceil(users?.length / userPage)}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </Box>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default ViewUsersPage;
