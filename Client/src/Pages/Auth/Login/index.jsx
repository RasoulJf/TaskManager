import React, { useContext } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import notify from "../../../../Utils/notify";
import { AuthContext } from "../../../../Utils/AuthContext";

const Login = ({ handlePageType }) => {
  const navigate = useNavigate();
  const {handleAuth} = useContext(AuthContext);

  const validationSchema = yup.object({
    username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data)
      if (data?.success) {
        notify("Login Successfully", "success");
        handleAuth(data?.data?.token, data?.data?.user);
        localStorage.setItem("token", data?.data?.token);
        navigate("/");
      } else {
        notify(data?.message || "Login Failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      notify("An error occurred. Please try again.", "error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Sign In
        </Typography>
        <Formik initialValues={{ username: "", password: "" }} validationSchema={validationSchema} onSubmit={handleLogin}>
          {({ handleSubmit }) => (
            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }} onSubmit={handleSubmit}>
              <Field name="username">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0" },
                  padding: 1.5,
                  fontSize: "1rem",
                }}
              >
                Sign In
              </Button>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Button onClick={handlePageType} sx={{ color: "#1976d2", fontWeight: "bold" }}>
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
