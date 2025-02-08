import React, { useContext } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import notify from "../../../../Utils/notify";
import { AuthContext } from "../../../../Utils/AuthContext";
import fetchData from "../../../../Utils/fetchData";

const Login = ({ handlePageType }) => {
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
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
      const response = await fetchData("auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response?.success) {
        notify("Login Successfully", "success");
        handleAuth(response?.data?.token, response?.data?.user);
        navigate("/");
      } else {
        notify(response?.message || "Login Failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      notify("An error occurred. Please try again.", "error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={(theme) => ({
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(4),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
        })}
      >
        <Typography
         component="h1" variant="h5" fontWeight="bold" mb={2}
        >
          Sign In
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleSubmit }) => (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={(theme) => ({
                marginTop: theme.spacing(1),
                width: "100%",
              })}
            >
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
                    sx={(theme) => ({
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: theme.shape.borderRadius / 2,
                    })}
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
                    sx={(theme) => ({
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: theme.shape.borderRadius / 2,
                    })}
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={(theme) => ({
                  marginTop: theme.spacing(3),
                  marginBottom: theme.spacing(2),
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  padding: theme.spacing(1.5),
                  fontSize: theme.typography.body1.fontSize,
                  borderRadius: theme.shape.borderRadius,
                })}
              >
                Sign In
              </Button>
              <Box
                sx={(theme) => ({
                  textAlign: "center",
                  marginTop: theme.spacing(2),
                })}
              >
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Button
                    onClick={handlePageType}
                    sx={(theme) => ({
                      color: theme.palette.primary.main,
                      fontWeight: theme.typography.fontWeightBold,
                    })}
                  >
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
