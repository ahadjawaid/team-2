import React from "react";
import Typography from '@mui/material/Typography';
import Userfront from "@userfront/core";
import Navbar from "../components/Navbar";
import { Box, Button, TextField } from "@mui/material";
import DenyAccess from "../components/DenyAccess";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { alertMessage: "" };

    this.submit = this.submit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
  }

  submit(event) {
    event.preventDefault();
    this.setAlertMessage();

    const data = new FormData(event.currentTarget);

    Userfront.login({
      method: "password",
      email: data.get("email"),
      password: data.get("password"),
      redirect: "/dashboard",
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  render() {
    return (
      <DenyAccess when="loggedin">
        <Navbar />
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">Sign In</Typography>

          {this.state.alertMessage !== "" && (
            <Typography>{this.state.alertMessage}</Typography>
          )}

          <Box component="form" onSubmit={this.submit} noValidate>
            <TextField 
              margin="normal" 
              variant="standard" 
              required 
              fullWidth 
              label="Email" 
              auto-complete="email" 
              name="email" 
              autoFocus
            />
            <TextField 
              margin="normal" 
              variant="standard" 
              required 
              fullWidth 
              label="Password" 
              type="password" 
              name="password" 
              auto-complete="current-password"
            />
            <Button type="sumbit" variant="contained" fullWidth>Sign In</Button>
          </Box>
        </Box>
      </DenyAccess>
    );
  }
}

export default Login;