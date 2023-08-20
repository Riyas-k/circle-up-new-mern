import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../axios/axios";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import image from "../../../assets/circle-Up.png";
import {
  loginFailure,
  loginSuccess,
  userBlocked,
} from "../../../redux/loginReducers";
import { auth, provider } from "../../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { setUserDetails } from "../../../redux/singlereducer";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { setUser } from "../../../redux/followReducer";
// import { setUsers } from "../../../redux/userSlice";

export default function SignIn() {
  // const userAuth = useSelector((state) => state.user.payload);
  // const Auth = useSelector((state) => state.user.payload);
  // React.useEffect(() => {
  //   if (userAuth && Auth.userExist.isBlock=='false') {
  //     console.log("hello");
  //     navigate("/");
  //   }
  // }, []);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const blocked = useSelector((state) => state.login.blocked);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      await axios.post("/sign-in", values).then((response) => {
        if (response.data.status) {
          localStorage.setItem("user", response.data.token);
          dispatch(setUserDetails({ payload: response.data }));
          dispatch(setUser({payload:response.data}))
          // dispatch(setUsers({ payload: response.data }));
          dispatch(loginSuccess());
          navigate("/");
        } else if (response.data.blocked) {
          dispatch(userBlocked());
        } else {
          dispatch(loginFailure());
        }
      });
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      // Handle successful sign-in
      const email = data.user.email;
      await axios.get(`/verify-google-user/${email}`).then((res) => {
        console.log(res.data,'data,hello');
        if (res.data) {
          let response = {
            userExist:res.data.data?.isEmailExist
          }
          console.log(response,'data,hoooooooo');

          dispatch(setUserDetails({ payload: response }));
          dispatch(setUser({payload:response}))
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };



  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: "3px solid white",
        background: "white",
        boxShadow: "20",
        borderRadius: "8px",
        marginTop: "50px",
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && (
          <Alert variant="filled" severity="error">
            Error Invalid Credentials!
          </Alert>
        )}
        {blocked && (
          <Alert variant="filled" severity="error">
            Blocked By Admin!
          </Alert>
        )}
        <img src={image} height="80px" alt="" />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <p style={{textAlign:'right',color:'blue'}}>
            <Link  to="/forgot-password">Forgot Password</Link></p>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, background: "green", ml: 15, width: "150px" }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item sx={{ marginBottom: "20px" }}>
              <Link
                to="/sign-up"
                style={{ textDecoration: "none", color: "black" }}
              >
                Dont have an account?{" "}
                <span style={{ color: "green" }}>Sign up</span>
              </Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ marginBottom: "10px" }}>
            <Grid item>
              <Typography sx={{ textAlign: "center" }}>OR</Typography>
              <img
                onClick={handleGoogleSignIn}
                src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png"
                alt="Google Sign In"
                style={{ width: "100%", height: 50, cursor: "pointer" }}
                crossOrigin="true"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
