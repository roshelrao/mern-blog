import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {  Link } from "react-router-dom";

const Navbar = (props) => {
    const drawerWidth = 240;
    const [navItems,setNavItems] = useState([]);

    useEffect(() => {
      if(localStorage.getItem("userInfo") !== null){ 
        setNavItems([{item:'Home',path:'/'}, {item:'My Blogs',path:'/myBlogs'}, ,{item:'Add Post',path:'/addBlog'}, {item:'Logout',path:'/logout'}]);
      }else{
        setNavItems([{item:'Home',path:'/'}, {item:'Register',path:'/register'}, {item:'Login',path:'/login'}]);
      }
    },[localStorage])

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider/>
            <List>
            {navItems.map(({item,path}) => (
            <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                <Link to={path} style={{textDecoration:'none',color:'black'}}><ListItemText primary={item} /></Link>
                </ListItemButton>
            </ListItem>
            ))}
            </List>
        </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({item,path}) => (
              <Button key={item} sx={{ color: '#fff' }}>
                <Link to={path} style={{textDecoration:'none', color:'white'}}>{item}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default Navbar