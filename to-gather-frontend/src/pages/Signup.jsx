import { React } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Grid,
  Paper,
  Avatar,
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
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import "./SignUp.css";

function Signup() {
  const paperStyle = {
    paddingTop: 40,
    padding: 30,
    width: 500,
    margin: "50px auto",
  };

  const { register, currentUser } = useAuth();
  const location = useLocation();
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
    register(data.email + "@cornell.edu", data.password, data.userProps).catch(
      (err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          setError("email", {
            type: "custom",
            message: "Email already in use. Please log in or use a new email.",
          });
        }
      }
    );
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar>
              <LoginIcon />
            </Avatar>
            <h2>Sign up</h2>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
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
                  value: /^[A-Z0-9._%+-]/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
            <TextField
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
            <TextField
              className="form-field"
              label="First Name"
              fullWidth
              {...reg("userProps.firstName")}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
            />
            <TextField
              className="form-field"
              label="Last Name"
              fullWidth
              {...reg("userProps.lastName")}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
            />
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
              color="primary"
              variant="contained"
              fullWidth
            >
              Create account
            </Button>
            <div className="login-message">
              <Typography>Already have an account?</Typography>
              <Link href="/login">Log in here.</Link>
            </div>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Signup;
