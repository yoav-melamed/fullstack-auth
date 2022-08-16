import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import axios from "axios";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleLogoff = async () => {
    await axios.post("http://localhost:3001/api/auth/logout", null, {
      withCredentials: true,
    });

    auth.setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Welcome to my App!
          </Typography>
          <Button color="inherit" onClick={handleLogoff}>
            Logoff
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" p={3}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
