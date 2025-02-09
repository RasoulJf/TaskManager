import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, Box, Avatar, Divider } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../../../Utils/AuthContext";

const drawerWidth = 260;
const Layout = () => {
  const {handleAuth} = useContext(AuthContext)
  const handleLogOut = () => {
    handleAuth(null,null)
    localStorage.removeItem('token')
  }
  
  return (
    <Box sx={{ display: "flex", bgcolor: "background.default", height: "100vh", p: 2 }}>
  
      <Box sx={{ width: drawerWidth, flexShrink: 0, bgcolor: "background.paper", borderRadius: "12px", boxShadow: 2, overflow: "hidden", height: "95vh", display: "flex", flexDirection: "column" }}>
        <Toolbar sx={{ bgcolor: "primary.main", color: "white", display: "flex", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", fontFamily: "typography.fontFamily", borderRadius: "12px 12px 0 0", py: 1 }}>Task Manager</Toolbar>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <List>
            <ListItem button component={Link} to="/tasks" sx={{ '&:hover': { bgcolor: "primary.light" }, transition: "0.3s" }}>
              <ListItemText primary="Tasks" sx={{ color: "primary.main", fontWeight: "bold" }} />
            </ListItem>
            <ListItem button component={Link} to="/categories" sx={{ '&:hover': { bgcolor: "secondary.light" }, transition: "0.3s" }}>
              <ListItemText primary="Categories" sx={{ color: "secondary.main", fontWeight: "bold" }} />
            </ListItem>
          </List>
        </Box>
        <Divider />
        <ListItem button component={Link} to="/profile" sx={{ '&:hover': { bgcolor: "info.light" }, transition: "0.3s", mt: "auto", p: 2 }}>
          <AccountCircle sx={{ color: "info.main", mr: 1, fontSize: 32 }} />
          <ListItemText primary="Profile" sx={{ color: "info.main", fontWeight: "bold" }} />
        </ListItem>
      </Box>

      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
   
        <AppBar position="static" sx={{ backgroundColor: "primary.main", boxShadow: 2, borderRadius: "12px", mx: 2, mt: -2.5}}>
          <Toolbar sx={{ borderRadius: "12px", px: 3, py: 1 }}>
            <Avatar sx={{ mr: 2, bgcolor: "secondary.main", width: 40, height: 40, fontSize: "1.2rem" }}>U</Avatar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "typography.fontFamily", fontWeight: "bold" }}>
              User Name
            </Typography>
            <Button color="inherit" onClick={handleLogOut} sx={{ textTransform: "none", fontWeight: "bold", border: "1px solid white", borderRadius: "12px", px: 3, py: 1, '&:hover': { bgcolor: "secondary.light" } }}>Logout</Button>
          </Toolbar>
        </AppBar>

    
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
