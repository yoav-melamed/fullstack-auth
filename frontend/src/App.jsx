import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import RequireAuth from "./components/RequireAuth";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";
import axios from "axios";
import Layout from "./layout/Layout";

const App = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const usersReq = await axios.get("http://localhost:3001/api/users/me", {
        withCredentials: true,
      });

      if (usersReq.status === 200) {
        auth.setIsLoggedIn(true);
        navigate("/home");
      } else {
        auth.setIsLoggedIn(false);
      }
    };

    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
