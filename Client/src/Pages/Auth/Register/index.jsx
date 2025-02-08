import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import * as yup from "yup"; // اصلاح این خط
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import notify from "../../../../Utils/notify";
const Register = ({ handlePageType }) => {
  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username Is Required")
      .min(3, "Username Must Be 3 Character"),
    email: yup
      .string()
      .required("Email is required") // اضافه کردن اعتبارسنجی اجباری
      .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "Email Not Valid"),
    password: yup
      .string()
      .required("Password is required") // اضافه کردن اعتبارسنجی اجباری
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const handleRegister = async (values) => {
    // اضافه کردن پارامتر values
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          // اصلاح این خط (Headers به headers تغییر یابد)
          "Content-Type": "application/json", // اصلاح این خط (josn به json تغییر یابد)
        },
        body: JSON.stringify(values),
      }
    );
    console.log(res)
    if(res?.ok){
      notify('Register Successfully','success')
      handlePageType()
    }else{
      notify('Register Failed','error')
    }
    } catch (error) {
      console.log(error);
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
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeconsoleight: "bold", mb: 2 }}
        >
          Sign Up
        </Typography>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {(
            { handleSubmit } // اضافه کردن handleSubmit
          ) => (
            <Box
              component="form"
              noValidate
              sx={{ mt: 1, width: "100%" }}
              onSubmit={handleSubmit} // اضافه کردن onSubmit
            >
              <Field name="username">
                {(
                  { field, meta } // اضافه کردن Field props
                ) => (
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
                    error={meta.touched && !!meta.error} // نمایش خطا
                    helperText={meta.touched && meta.error} // پیام خطا
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
                Sign Up
              </Button>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2">
                  Do you have an account?{" "}
                  <Button
                    onClick={handlePageType}
                    underline="hover"
                    sx={{ color: "#1976d2", fontWeight: "bold" }}
                  >
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
