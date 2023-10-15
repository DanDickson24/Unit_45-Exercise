import React, { useState } from 'react';
import { useUser } from './UserContext';
import { Navigate} from 'react-router-dom';

function Login() {
  const { authenticate } = useUser();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authenticate(formData);
      setIsAuthenticated(true); 
    } catch (err) {
      console.error("Authentication error", err);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
