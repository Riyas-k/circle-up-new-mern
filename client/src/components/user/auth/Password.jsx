import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";

const PasswordForm = () => {
  const [error, setError] = useState(false);
  const location = useLocation()
  const {email} = location.state
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async(values) => {
      // Handle form submission
      if (values.password !== values.confirmPassword) {
        setError(true);
      } else {
        await axios.put(`/new-password/${email}`,values).then((res)=>{
            if(res.data){
                navigate('/sign-in')
            }
        })
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center">
        Forgot Password
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: "20px" }}>
        Enter your password to reset your password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
        </Grid>
        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: "10px" }}>
            Passwords do not match
          </Typography>
        )}
        <Button type="submit" variant="contained" sx={{ marginTop: "20px" }}>
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default PasswordForm;
