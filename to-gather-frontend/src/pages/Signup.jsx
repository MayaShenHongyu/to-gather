import { React, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Footer from "../components/Footer";
import BannerImage from "../assets/friends.png";
import { useAuth } from "../contexts/AuthContext";
import handleError from "../components/ErrorHandler";
import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Link,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./SignUp.css";

function Signup() {
  const paperStyle = {
    padding: "30px 80px 40px 80px",
    width: 500,
    margin: "50px auto",
    maxHeight: "80vh",
    borderRadius: 20,
  };

  const { register, currentUser } = useAuth();
  const location = useLocation();
  const [img, setImg] = useState();
  const {
    register: reg,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  if (currentUser) {
    return <Navigate to={location.state?.from?.pathname || "/dashboard"} />;
  }

  const onSubmit = (data) => {
    data.userProps.bio = img;
    register(data.email + "@cornell.edu", data.password, data.userProps).catch(
      (err) => {
        console.log(err);
        handleError(setError, err.code);
      }
    );
  };

  return (
    <>
      <div
        className="landing"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <h2>Sign up for a new account</h2>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container justifyContent={"space-between"}>
                <TextField
                  size="small"
                  className="form-field"
                  label="Email"
                  placeholder="Enter your email"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">@cornell.edu</InputAdornment>
                    ),
                  }}
                  {...reg("email", {
                    required: "Required field",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
                <TextField
                  size="small"
                  className="form-field"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  fullWidth
                  {...reg("password", {
                    required: "Required field",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                />
                <TextField
                  size="small"
                  className="form-field"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  {...reg("passwordConfirm", {
                    shouldUnregister: true,
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match.",
                  })}
                  error={!!errors?.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                />
                <Grid item xs={5.5}>
                  <TextField
                    size="small"
                    className="form-field"
                    label="First Name"
                    fullWidth
                    {...reg("userProps.firstName")}
                    error={!!errors?.firstName}
                    helperText={errors?.firstName?.message}
                  />

                </Grid>

                <Grid item xs={5.5}>
                  <TextField
                    size="small"
                    className="form-field"
                    label="Last Name"
                    fullWidth
                    {...reg("userProps.lastName")}
                    error={!!errors?.lastName}
                    helperText={errors?.lastName?.message}
                  />
                </Grid>

                <TextField
                  size="small"
                  className="form-field"
                  placeholder="Tell the community about yourself..."
                  multiline
                  fullWidth
                  rows={3}
                  {...reg("userProps.bio")}
                />

                <input
                  type="file"
                  style={{ paddingTop: "10px" }}
                  onChange={(event) => setImg(event.target.files[0])}
                />
                
              </Grid>
              
              

              <FormControl
                className="form-field radio"
                {...reg("userProps.gender")}
              >
                <FormLabel>Gender</FormLabel>
                <RadioGroup row defaultValue="female">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="non-binary"
                    control={<Radio />}
                    label="Non-Binary"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                id="submit-btn"
                type="submit"
                variant="contained"
                fullWidth
              >
                Create account
              </Button>
              <div className="signin-signup-message">
                <Typography>Already have an account?</Typography>
                <Link href="/login">Log in here.</Link>
              </div>
            </form>
          </Paper>
        </Grid>
      </div>
    </>
  );
}

export default Signup;
