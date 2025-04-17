import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes.jsx";
import Header from "./components/layouts/Header.jsx";
import Footer from "./components/layouts/Footer.jsx";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { login, logout } from "./redux/auth/authSlice.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/auth/getcurrentuser",
          { withCredentials: true }
        );
        if (res.status !== 200) {
          throw new Error("Not authenticated");
        }
        const { name, role } = res.data.user;
        dispatch(login({ token: true, name:name, role :role}));
      } catch (err) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, []);

  return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header />
          <AppRoutes />
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
  );
}

export default App;
