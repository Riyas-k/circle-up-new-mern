/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./components/user/auth/SignIn";
import SignUp from "./components/user/auth/Signup";
import Home from "./pages/user/Home";
import Error from "./Error";
import AdminLogin from "./components/admin/auth/login";
import AdminHome from "./pages/admin/Dashboard";
import ViewUsersPage from "./pages/admin/ViewUsers";
import ReportedPosts from "./pages/admin/ReportedPosts";
import { useDispatch, useSelector } from "react-redux";
// import SettingsPage from "./pages/user/Settings";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { useEffect, useMemo, useState } from "react";
import ForgotPasswordForm from "./components/user/auth/Email";
import PasswordForm from "./components/user/auth/Password";
import Profile from "./pages/user/Profile";
import Chat from "./pages/user/chat/Chat";
import Call from "./pages/user/call/Call";
import axios from './axios/axios'
import { clearUser } from "./redux/singlereducer";
// import { userBlocked } from "./redux/loginReducers";

function App() {
  const adminAuth = useSelector((state) => state.admin.payload);
  const auth = useSelector((state) => state.user.payload);
 
  const [block,setBlock] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const loading = useSelector((store)=>store.theme.blockLoading);
  const fetchUser = async () => {
    const data = await axios.get(`/profile/${auth?.userExist?._id}`);
    if(data?.data?.isBlock==true){
      localStorage.setItem('blocked',true)
      const isBlock = localStorage.getItem('blocked')
      setBlock(isBlock)
        console.log('use inside lod');
        dispatch(clearUser())
        navigate('/sign-in')
        // dispatch(setBlockLoading())
      }else{
        // setBlock(false)
      }
    
  };
  useEffect(() => {
    fetchUser();
  }, [auth,block]);
  const mode = useSelector((store) => store.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
 
  // useEffect(()=>{
  //   if(loading){
  //    console.log('kery');
  //   fetchUser()
  //   dispatch(setBlockLoading())
  //  }
  // },[loading])
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* user */}
          <Route
            path="/sign-in"
            element={!auth  ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up"
            element={!auth    ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/forgot-password"
            element={!auth ? <ForgotPasswordForm /> : <Navigate to="/" />}
          />
          <Route
            path="/new-password"
            element={!auth ? <PasswordForm /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={auth  ? <Home block={block}/> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/profile/:userId"
            element={auth ? <Profile  block={block}/> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/chat"
            element={auth  ? <Chat /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/room/:roomId"
            element={auth  ? <Call /> : <Navigate to="/sign-in" />}
          />

          {/* admin */}
          <Route
            path="/admin/login"
            element={!adminAuth ? <AdminLogin /> : <Navigate to="/admin" />}
          />

          <Route
            path="/admin"
            element={adminAuth ? <AdminHome /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/view-users"
            element={
              adminAuth ? <ViewUsersPage /> : <Navigate to="/admin/login" />
            }
          />
          <Route
            path="/admin/reported-posts"
            element={
              adminAuth ? <ReportedPosts /> : <Navigate to="/admin/login" />
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
