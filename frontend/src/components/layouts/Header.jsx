import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice.js";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {token,name,role} = useSelector((state) => state.auth);


  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true, 
      });
  
      if (res.status === 200) {
        dispatch(logout());
        navigate("/");
      } else {
        navigate("/error", { state: { message: "Logout failed" } });
      }
    } catch (error) {
      navigate("/error", { state: { message: "Logout failed" } });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i
            className="bi bi-book"
            style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
          ></i>
          <span>Bookstore</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/popular">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/store">
                Store
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {token ? (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  ></i>
                  {name || "User"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="nav-link">
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
