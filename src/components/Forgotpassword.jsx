import axios, { all } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const handlechange = (e) => {
    setEmail(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://pwd-reset-back-end.onrender.com/auth/forgotpassword",
        { email }
      );
      console.log(response.data.message);

      if (response.data.success) {
        setMessage(response.data.message)
        
      } 
    } catch (error) {
     setError(error.response?.data?.message || "error occured");
      
    }
  };

  return (
    <div className="center container mt-4">
      <div className="border border-primary p-3 mb-3">
        <h2>Forgot Password</h2>
        {message && <p className="alert alert-success">{message}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
        <form className="" onSubmit={handlesubmit}>
          <div className="mb-3 ">
            <label className="form-label">Enter your email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handlechange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
