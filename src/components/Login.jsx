import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    setMessage("");
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill out all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://pwd-reset-back-end.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);

      setMessage("Login successful redirecting....");

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 border border-primary p-4">
          <h2 className="text-center">Login</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handlePwdChange}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              Forgot Password? <Link to="/forgotpassword">Click here!</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
