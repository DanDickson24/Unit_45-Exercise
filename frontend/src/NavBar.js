import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';

function Navbar() {
  const { user, logout } = useUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
        {user && user.username && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/companies">Companies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>
      {user && user.username ? (
        <span className="navbar-text">
          Welcome, {user.username} <button onClick={logout} className="btn btn-outline-danger ml-2">Logout</button>
        </span>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Signup</Link>
          </li>
        </ul>
      )}
      </div>
    </nav>
  );
}

export default Navbar;

