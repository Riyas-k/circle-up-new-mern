import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
const ForgotPasswordForm = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      await axios.get(`/forgot-password/${values.email}`).then((res) => {
        if (res.data) {
          navigate("/new-password",{state:{email:values.email}});
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      });
      // Add your logic here for sending the reset password email
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Please enter your email to reset your password
        </Typography>
        {error && (
          <Alert variant="filled" severity="error">
            Email Not Exist!
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;
