import React, { useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "../../../axios/axios";
import { Alert } from "@mui/material";
import { auth, provider } from "../../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import image from "../../../assets/circle-Up.png";
import { loginFailure } from "../../../redux/loginReducers";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const userAuth = useSelector((state) => state.user.payload);
  React.useEffect(() => {
    if (userAuth) {
      navigate("/");
    }
  }, []);
  const [state, setState] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    UserName: "",
    phone: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    UserName: Yup.string().required("User Name is required"),
    phone: Yup.string().required("Phone No is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const [value, setValue] = React.useState();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      const { email, displayName, photoURL } = data.user;
      setValue({
        email: email || "",
        displayName: displayName || "",
        photoURL: photoURL || "",
      });
      await axios.post("/google", value).then((response) => {
        console.log(response);
        if (response.data.status) {
          navigate("/sign-in");
        } else {
          console.log("else");
          setState(true);
        }
      });
    });
  };
  const error = useSelector((state) => state.login.error);
const dispatch = useDispatch()
  const onSubmit = async (values) => {
    try {
      await axios.post("/sign-up", values).then((response) => {
        console.log(response);
        if (response.data.status) {
          navigate("/sign-in");
        } else {
          dispatch(loginFailure());
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: "3px solid white",
        background: "white",
        boxShadow: "20",
        borderRadius: "8px",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >   {error && (
        <Alert variant="filled" severity="error">
          Error Invalid Credentials!
        </Alert>
      )}
        <img src={image} height="80px" alt="" />
        {state && (
          <Alert variant="filled" severity="error">
            Error Email Already Exist!
          </Alert>
        )}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="UserName"
                value={formik.values.UserName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.UserName && formik.errors.UserName}
                helperText={formik.touched.UserName && formik.errors.UserName}
                required
                fullWidth
                id="UserName"
                label="User Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone No"
                name="phone"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                value={formik.values.email}
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                id="password"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, background: "green", ml: 15, width: "150px" }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item sx={{ marginBottom: "10px" }}>
              <Link
                to="/sign-in"
                variant="body2"
                style={{ textDecoration: "none", color: "black" }}
              >
                Already have an account?
                <span style={{ color: "green" }}>Sign in</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Grid container justifyContent="center" sx={{ marginBottom: "10px" }}>
          <Grid item>
            <Typography sx={{ textAlign: "center" }}>OR</Typography>
            <img
              onClick={handleGoogleSignIn}
              src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png"
              alt="Google Sign In"
              style={{ width: "100%", height: 50, cursor: "pointer" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
