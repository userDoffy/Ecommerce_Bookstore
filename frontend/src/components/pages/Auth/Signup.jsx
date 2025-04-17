import React from 'react'
import useForm from "../../../customhooks/useForm.jsx"
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import useRedirectIfAuthenticated from "../../../customhooks/useRedirectIfAuthenticated.jsx";

const Signup = () => {
  useRedirectIfAuthenticated('/popular');
  const navigate = useNavigate();
  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData, { headers: { "Content-Type": "application/json" } });
      if (response.status === 201) {
        navigate("/verification", { state: { email: formData.email } });
      } else {
        navigate("/error", { state: { message: "Signup failed!" } });
      }

    } catch (error) {
      navigate("/error", { state: { message: "Signup failed!" } });
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem' }}>
        <h3 className="text-center mb-4">Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="password" className="form-label">Password</label>
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
          <button type="submit" className="btn btn-primary w-100">Signup</button>
        </form>
      </div>
    </div>

  );
}

export default Signup