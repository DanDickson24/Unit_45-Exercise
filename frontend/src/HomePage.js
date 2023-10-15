import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext'; 

function HomePage() {
  const { user } = useUser(); 

  return (
    <div>
      <h1>Jobly</h1>
      {user && user.username ? (
        <>
          <p>All the jobs in one, convenient place.</p>
          <p>Welcome Back, {user.username}</p> 
        </>
      ) : (
        <>
          <Link to="/login"><button>Log In</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link>
        </>
      )}
    </div>
  );
}

export default HomePage;
