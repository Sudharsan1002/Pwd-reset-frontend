import React from 'react'
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1>Login Successful!</h1>
          <p>Welcome to your dashboard.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Go to Signup Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard