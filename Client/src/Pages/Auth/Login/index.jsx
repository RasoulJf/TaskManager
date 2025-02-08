import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import * as yup from "yup"; // اصلاح این خط
import { data, useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import notify from "../../../../Utils/notify";
const Login = ({ handlePageType }) => {
  const navigate = useNavigate()
  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username Is Required")
      .min(3, "Username Must Be 3 Character"),
    password: yup
      .string()
      .required("Password is required") // اضافه کردن اعتبارسنجی اجباری
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const handleLogin = async (values) => {
    // اضافه کردن پارامتر values
    try {
      const res = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          // اصلاح این خط (Headers به headers تغییر یابد)
          "Content-Type": "application/json", // اصلاح این خط (josn به json تغییر یابد)
        },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json()
    console.log(data)
    if(res?.ok){
      notify('Login Successfully','success')
      localStorage.setItem('token',data?.data?.token)
      navigate('/')
    }else{
      notify('Login Failed','error')
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
          Sign In
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
