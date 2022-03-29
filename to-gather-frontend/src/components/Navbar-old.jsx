import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CoPresent } from "@mui/icons-material";

function Navbar({ isSignedIn }) {
  const CheckSignedIn = ({ input }) => {
    console.log(input);
    if (!input) {
      return (
        <Button href="/Login" color="inherit">
          Login
        </Button>
      );
    } else {
      return (
        <Button href="/" color="inherit">
          Logout
        </Button>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            to="/"
            underline="none"
            component={RouterLink}
            variant="h6"
            color="inherit"
          >
            ToGather
          </Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          <CheckSignedIn input={false} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
