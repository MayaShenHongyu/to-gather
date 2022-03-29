import { React, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import handleError from "../components/ErrorHandler";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";

function Login() {
  const paperStyle = {
    paddingTop: 40,
    padding: 20,
    height: "60vh",
    width: 400,
    margin: "50px auto",
  };
  const avatarStyle = {};
  const btnstyle = { margin: "25px 0" };

  const { logIn, currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();



  const onSubmit = (data) => {
    logIn(data.email, data.password).catch((error) => {
        handleError(setError, error.code);
      });
    
  };
  const location = useLocation();

  if (currentUser) {
    return <Navigate to={location.state?.from?.pathname || "/dashboard"} />;
  }

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LoginIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="email"
              placeholder="Enter your email"
              autoComplete="email"
              variant="standard"
              fullWidth
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />

            <TextField
              label="password"
              placeholder="Enter your password"
              variant="standard"
              type="password"
              fullWidth
              {...register("password", {
                required: "Required field",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign in
            </Button>
          </form>

          <Typography>
            {" "}
            Do you have an account?
            <Link href="/Signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
