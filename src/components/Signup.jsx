import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [message, setmessage] = useState("")
  const [error, seterror] = useState("")
  const navigate = useNavigate()
  


  const handlechange = (e) => {
    const { name, value } = e.target
    setFormdata((prevData)=>({...prevData,[name]:value}))
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pwd-reset-back-end.onrender.com/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      setmessage(response.data.message)

      navigate("/login")

      seterror("")

      setFormdata({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.log(error.response?.data?.message||"Signup failed") 
    }
  }

  



  return (
    <div>
      <div className="container mt-5 col-md-3 border border-primary p-3 h-100">
        <h2 className="text-center">Signup</h2>
        <form className="" onSubmit={handlesubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handlechange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handlechange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlechange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary col-md-4">
            Signup
          </button>
          <div className="text-center">
           ALready have an account? <Link to="/login">Click here to login!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup