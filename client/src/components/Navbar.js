import React from "react";
import { AppBar, Box, Button, ButtonBase, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import Userfront from "@userfront/core";
import UserAvatar from "./UserAvatar";
import AccountCircle from "@mui/icons-material/AccountCircle"
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const defaultPages = ["Product", "Pricing"];
const userPages = ["Explore", "Queries"];

const navButtonStyle = {
  padding: 2,
  height: 36,
  borderRadius: 18,
  fontSize: "1rem",
  textTransform: "none",
}
const defaultPageButtonStyle = { 
  display: { xs: "none", sm: "flex" }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggleUserMenu: false };

    this.openUserMenu = this.openUserMenu.bind(this);
    this.closeUserMenu = this.closeUserMenu.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  openUserMenu(event) {
    this.setState({ toggleUserMenu: event.currentTarget });
  }

  closeUserMenu() {
    this.setState({ toggleUserMenu: false });
  }

  signOut() {
    this.closeUserMenu();
    Userfront.logout();
  }

  render() {
    let loggedIn = (Userfront.tokens.accessToken != null);
    let pages = loggedIn ? userPages : defaultPages
    let pageButtonStyle = loggedIn ? {} : defaultPageButtonStyle

    return <AppBar position="static" color="background" sx={{ padding: 0.5 }}>
      <Toolbar>
        <ButtonBase component="a" href={loggedIn ? "/dashboard" : "/"} disableRipple>
          <img src="../assets/logo_black.png" alt="logo" height="48px" />
          <Typography href="/" sx={{ marginLeft: 2.5, fontWeight: "bold" }} variant="h5" component="h2">
            Optimine
          </Typography>
        </ButtonBase>

        <Box component="div" sx={{ flexGrow: 1 }}></Box>

        <Stack direction="row" alignItems="center" spacing={1.2} component="div">
          {pages.map((page) =>
            <Button 
              href={"/" + page.toLowerCase()} 
              sx={{...navButtonStyle, ...pageButtonStyle}} 
              variant="text" 
              color="inherit"
            >
                {page}
            </Button>
          )}

          {loggedIn && (
            <div>
              <Tooltip title="Account settings">
                <IconButton onClick={this.openUserMenu}>
                  <UserAvatar name={Userfront.user.name ?? ""} />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={this.state.toggleUserMenu}
                open={Boolean(this.state.toggleUserMenu)}
                onClose={this.closeUserMenu}
              >
                <MenuItem component="a" href="/profile">
                  <ListItemIcon><AccountCircle /></ListItemIcon> Profile
                </MenuItem>
                <Divider />
                <MenuItem component="a" href="/settings">
                  <ListItemIcon><Settings /></ListItemIcon> Settings
                </MenuItem>
                <MenuItem onClick={this.signOut}>
                  <ListItemIcon><Logout /></ListItemIcon> Sign Out
                </MenuItem>
              </Menu>
            </div>
          )}

          {!loggedIn &&
            <Button href="/login" sx={navButtonStyle} variant="contained" color="secondary">Sign In</Button>
          }
          {!loggedIn &&
            <Button href="/signup" sx={navButtonStyle} variant="contained" color="primary">Sign Up</Button>
          }
        </Stack>
      </Toolbar>
    </AppBar>;
  }
}

export default Navbar;