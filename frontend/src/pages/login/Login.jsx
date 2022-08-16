import {
  Box,
  Typography,
  styled,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

const LoginContainer = styled(Paper)({
  borderRadius: 12,
  width: "30%",
  margin: "0 auto",
  marginTop: 120,
  padding: 32,
});

const LoginForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginTop: 8,
  gap: 16,
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authFailed, setAuthFailed] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) navigate("/home");
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:3001/api/auth",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (result.status === 204) {
        auth.setIsLoggedIn(true);

        navigate("/home");
      }
    } catch {
      setPassword("");
      setAuthFailed(true);
    }
  };

  return (
    <LoginContainer>
      <Typography variant="h4">Login</Typography>
      <Typography variant="h6">Welcome back!</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <i>Hint: admin/admin</i>
      </Typography>

      <LoginForm component="form" onSubmit={handleFormSubmit}>
        <TextField
          label="Username"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {authFailed && <Alert severity="error">Authentication Failed!</Alert>}
        <Button type="submit" variant="contained">
          Login
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
