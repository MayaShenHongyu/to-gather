import { React, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import './Signup.css';


function Signup() {
    const paperStyle = {paddingTop: 40, padding: 20, height: '60vh', width: 400, margin: "50px auto"}
    const avatarStyle = {}
    const btnstyle = {margin:'25px 0'}

    const { register, currentUser } = useAuth();
    const [errorMessage, setErrorMessage] = useState();

    const { 
        register: reg, 
        handleSubmit,
        formState: {errors}, 
    } = useForm();
    
    const onSubmit = (data) => { 
        register(data.email, data.password).catch((err) => {
            if (err.code === "auth/email-already-in-use") {
              setErrorMessage(
                "Email already in use. Please log in or use a new email."
              );
            }
        });
        // console.log(data, errors);
    };
    const location = useLocation();

    if (currentUser) {
        return <Navigate to={location.state?.from?.pathname || "/dashboard"} />;
    }

    return <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LoginIcon /></Avatar>
                    <h2>Sign up</h2>
                </Grid>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="email"
                        placeholder="Enter your email"
                        variant="standard"
                        fullWidth
                        {...reg("email", { 
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
                        variant="standard"
                        type="password"
                        fullWidth
                        {...reg("password", { 
                            required: "Required field",
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }, 
                        })}
                        error={!!errors?.password}
                        helperText={errors?.password ? errors.password.message : null}
                    /> 

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>

                </form>
            </Paper>
        </Grid>



    </>
}

export default Signup;