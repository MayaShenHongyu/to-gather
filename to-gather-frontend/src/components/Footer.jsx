import React from "react";
//import InstagramIcon from "@material-ui/icons/Instagram";
//import TwitterIcon from "@material-ui/icons/Twitter";
//import FacebookIcon from "@material-ui/icons/Facebook";
//import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <InstagramIcon /> <TwitterIcon /> <FacebookIcon /> <LinkedInIcon />
      </div>
      <p> &copy; 2022 to-gather.com</p>
    </div>
  );
}

export default Footer;
