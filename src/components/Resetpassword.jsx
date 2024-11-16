import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Resetpassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [tokenvalid, settokenvalid] = useState(null)
    const [searchParams] = useSearchParams()
    const navigate=useNavigate()
    const token = searchParams.get("token")
    



    useEffect(() => {
        const validatetoken = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/auth/validateToken?token=${token}`);
              if (response.data.success) {
                  settokenvalid(true)
              }
          } catch (error) {
              setError(error.response?.data?.message || "Token validtion failed")
              settokenvalid(false)
          }
        }
        

        if (token) {
            validatetoken()
        } else {
            setError("Invalid token please request a new reset link")
            settokenvalid(false)
        }


    }, [token])
    



    const handlePwdChange = (e) => {
        setPassword(e.target.value)
    }

    
    const handleConfirmPwdChange = (e) => {
      setConfirmPassword(e.target.value);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

        if (password !== confirmPassword) {
            setError("Passwords does not match")
            return;
        }
        try {
            const response = await axios.patch("http://localhost:3000/auth/resetpassword", {
                token,
                password,
            });

          setMessage("Password Reset successful redirecting....");

          setTimeout(() => navigate("/login"), 1500);

        } catch (error) {
            setError(error.response?.data?.message||"An error occured")
        }
    }



    if (tokenvalid === null) {
      return (
        <div className="container mt-5">
          <div className="alert alert-loading">
            <p>Loading...</p>
          </div>
        </div>
      );
    }


    if (!tokenvalid) {
         return (
           <div className="container mt-5">
             <div className="alert alert-danger">
                     {error || "Invalid token Please request a new password reset link."}
                     
             </div>
           </div>
         );
    }



  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center  ">
          <div className="col-md-3 border border-primary p-3 ">
                      <h2 className="text-center">Reset Password</h2>
                      {message && <div className='alert alert-success'> {message} </div>}
                      {error && <div className='alert alert-warning'> {error} </div>}
         
                      <form onSubmit={handleSubmit}>
           
                          <div className="mb-3">
                              <label className="form-label">New Password</label>
                              <input
                                  type="password"
                                  name='password'
                                  value={password}
                                  onChange={handlePwdChange}
                                  className="form-control"
                                  placeholder="Enter new password"
                                  required
                              />
                              </div>
              
                          <div className="mb-3">
                              <label className="form-label">Confirm New Password:</label>
                              <input
                                  type="password"
                                  name="confirmPassword"
                                  value={confirmPassword}
                                  onChange={handleConfirmPwdChange}
                                  className="form-control"
                                  placeholder="Confirm new password"
                                  required
                              />
              
                          </div>
        
                          <button type="submit" className="btn btn-primary ">
                              Reset Password
             
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Resetpassword