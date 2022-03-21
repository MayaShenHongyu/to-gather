import React from 'react';
import './Login.css';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
    const paperStyle = {paddingTop: 40, padding: 20, height: '60vh', width: 400, margin: "50px auto"}
    const avatarStyle = {}
    const btnstyle = {margin:'25px 0'}

    return <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LoginIcon /></Avatar>
                    <h2>Sign in</h2>
                </Grid>

                <TextField
                    label="Email"
                    placeholder="Enter your email"
                    variant="standard"
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    placeholder="Enter your password"
                    variant="standard"
                    type="password"
                    fullWidth
                    required
                /> 

                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography > Do you have an account? 
                    <Link href="/Signup" >
                        Sign Up 
                    </Link>
                </Typography> 
                
            </Paper>
        </Grid>



    </>
}

export default Login;
