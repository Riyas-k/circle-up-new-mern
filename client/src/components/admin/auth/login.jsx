import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../../../redux/loginReducers";
import { setAdmin } from "../../../redux/adminAuthReducer";
import image from "../../../assets/circle-Up.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  // const error = useSelector((state) => state.login.error);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const auth = useSelector((state) => state.admin.payload);
  useEffect(() => {
    if (auth) {
      navigate("/admin");
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios.post("/admin/login", values).then(async (res) => {
        console.log(res.data, "res");
        if (res.data.status) {
          localStorage.setItem("admin", res.data.data.token);
          dispatch(setAdmin({ payload: res.data.data.token }));
          dispatch(loginSuccess());
          navigate("/admin");
        } else {
          dispatch(loginFailure());
          toast.error("Error Invalid Credentials!", { autoClose: 2000 });
        }
      });
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          border: "3px solid white",
          boxShadow: "20",
          marginTop: "60px",
          borderRadius: "8px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="logo-container">
            <img src={image} height="80px" alt="" />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
          <Typography component="h1" variant="h5">
            Admin Sign in
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
              error={formik.touched.email && Boolean(formik.errors.email)}
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
              error={formik.touched.password && Boolean(formik.errors.password)}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "green" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
