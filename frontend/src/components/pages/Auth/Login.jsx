import React from "react";
import useForm from "../../../customhooks/useForm.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/authSlice.js";
import useRedirectIfAuthenticated from "../../../customhooks/useRedirectIfAuthenticated.jsx";
import axios from "axios";

const Login = () => {
  useRedirectIfAuthenticated('/popular');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
    role: "User",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", formData, {
        withCredentials: true,
      });
      
      if (response.status == 200) {
        const res = await axios.get(
          "http://localhost:5000/auth/getcurrentuser",
          { withCredentials: true }
        );

        if (res.status !== 200) {
          throw new Error("Not authenticated");
        }
        const { name, role } = res.data.user; 
        
        dispatch(login({ token: true,name:name, role: role }));

        navigate(role === "Admin" ? "/admin/dashboard" : "/");
        navigate(role === "User" ? "/popular" : "/");
      }
      else{
        navigate("/error", { state: { message: "Login failed" } });
      }
    } catch (error) {
      navigate("/error", { state: { message: "Error logging in" } });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Signup
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
