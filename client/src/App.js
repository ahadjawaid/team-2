import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// Pages
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Setting from "./pages/Setting";

// Redux
import { fetchUser } from './store/actions';
import { createTheme, ThemeProvider } from "@mui/material";

// Theming
import "./style/App.css"
const theme = require("./style/theme.js");

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
