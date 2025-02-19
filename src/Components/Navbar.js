import React, { useState } from "react";
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider 
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import logo from "./Images/ph-removebg-preview.png";
import { FaArrowRightToBracket } from "react-icons/fa6";
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #1e3c72, #2a5298)",
          padding: "8px 16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          {/* Mobile Menu Icon */}
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={toggleDrawer(true)} 
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Title */}
          <Typography 
            variant="h6" 
            sx={{ display: "flex", alignItems: "center", flexGrow: 1, fontWeight: "bold", letterSpacing: "1px" }}
          >
            <img className="ppc-logo" src={logo} alt="Logo" />
            <span className="ppc">PRAYER POWER CENTER</span>
          </Typography>

          <Button 
            component={Link} 
            to="/add-details" 
            color="inherit" 
            sx={{ mx: 1, display: { xs: "none", md: "inline-flex" } }}
          >
            Add Details
          </Button>
          <Button 
            component={Link} 
            to="/details" 
            color="inherit" 
            sx={{ mx: 1, display: { xs: "none", md: "inline-flex" } }}
          >
            Details List
          </Button>

          <button className="logout-btn" onClick={handleLogout}>
          Logout
          <span><FaArrowRightToBracket /></span>
        </button>

        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/add-details" onClick={toggleDrawer(false)}>
            <ListItemText primary="Add Details" />
          </ListItem>
          <ListItem button component={Link} to="/details" onClick={toggleDrawer(false)}>
            <ListItemText primary="Details List" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleLogout} sx={{ color: "red", fontWeight: "bold" }}>
            <LogoutIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
