import { React, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import handleError from "../components/ErrorHandler";
import BannerImage from "../assets/friends.png";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";

function Login() {
  const paperStyle = {
    padding: "40px 80px 50px 80px",
    width: 400,
    margin: "50px auto",
    borderRadius: 20,
  };

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
    // <>
    <div className="landing" style={{ backgroundImage: `url(${BannerImage})` }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Welcome Back!</h2>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            placeholder="Enter your email"
            className="form-field"
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
            label="Password"
            placeholder="Enter your password"
            className="form-field"
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

          <Button id="submit-btn" type="submit" variant="contained" fullWidth>
            Sign in
          </Button>
        </form>
        <div className="signin-signup-message">
          <Typography>Don't have an account?</Typography>
          <Link href="/signup">Sign up!</Link>
        </div>
      </Paper>
      {/* </Grid> */}
    </div>
    // </>
  );
}

export default Login;
