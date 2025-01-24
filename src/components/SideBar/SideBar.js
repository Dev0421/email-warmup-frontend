import React, { useState, useEffect, useRef } from "react";
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false); // State to manage the sidebar's visibility
  const sidebarRef = useRef(null); // Reference for the sidebar
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/dashboard'); // Navigate to the /dashboard route
  };

  const handleEmailClick = () => {
    navigate('/email_template'); // Navigate to the /email_template route
  };

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false); // Close sidebar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent horizontal scrollbar when sidebar is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
    };
  }, [open]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
            </IconButton>
        </Toolbar>

      {/* Sidebar (Drawer) */}
      <Drawer
        ref={sidebarRef} // Attach the ref to the Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            userSelect: 'none', // Disable text selection in the sidebar
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List>
          <ListItem button onClick={handleHomeClick} sx={{ userSelect: 'none' }}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleEmailClick} sx={{ userSelect: 'none' }}>
            <ListItemText primary="Email Template" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: 3,
          marginLeft: open ? 240 : 0, // Shift content when sidebar is open
          transition: 'margin-left 0.3s ease',
        }}
      >
      </Box>
    </Box>
  );
};

export default Sidebar;






