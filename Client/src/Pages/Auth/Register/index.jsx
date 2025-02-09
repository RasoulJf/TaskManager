import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Field, Formik } from "formik";
import notify from "../../../../Utils/notify";
import fetchData from "../../../../Utils/fetchData";

const Register = ({ handlePageType }) => {
  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const handleRegister = async (values) => {
    try {
      const response = await fetchData("auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response?.success) {
        notify("Registered successfully!", "success");
        handlePageType();
      } else {
        notify(response?.message || "Registration failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Register error:", error);
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
        <Typography component="h1" variant="h5" fontWeight="bold" mb={2}>
          Sign Up
        </Typography>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleSubmit }) => (
            <Box component="form" noValidate onSubmit={handleSubmit} mt={1} width="100%">
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
              <Field name="email">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
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
                    autoComplete="new-password"
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
                Sign Up
              </Button>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Button onClick={handlePageType} sx={{ color: "primary.main", fontWeight: "bold" }}>
                    Sign In
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

export default Register;
