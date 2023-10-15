import React, { createContext, useState, useEffect, useContext } from "react";
import JoblyApi from './JoblyApi';

// Create a User Context for global state
export const UserContext = createContext();

// Custom hook to use the User Context
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component provides user state and methods to its descendants
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: null,
    firstName: "",
    lastName: "",
    email: ""
  });
  const [token, setToken] = useState(localStorage.getItem('jobly-token') || null);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const hasAppliedToJob = (id) => appliedJobs.has(id);
  // Update the applyToJob function
  const applyToJob = async (id) => {
    if (hasAppliedToJob(id)) return;
    try {
      await JoblyApi.applyToJob(user.username, id);
      console.log("Successfully applied to job with ID:", id); // Add this log
      setAppliedJobs(new Set([...appliedJobs, id]));
    } catch (err) {
      console.error('Error applying to job:', err);
    }
  };

  // Initialize user on component mount
  useEffect(() => {
    const initializeUser = async () => {
      const storedToken = localStorage.getItem('jobly-token');
      if (storedToken) {
        setToken(storedToken); // Set token from local storage
        try {
          // Decode username from token and fetch user data
          const { username } = JSON.parse(atob(storedToken.split(".")[1]));
          await fetchAndSetUser(username, storedToken);
        } catch (err) {
          console.error("Error initializing user:", err);
        }
      }
      setLoading(false); // Update loading status
    };

    initializeUser();
  }, [token]);

  // Function to fetch and set user data based on username and token
  const fetchAndSetUser = async (username, token) => {
    try {
      const userData = await JoblyApi.request(`users/${username}`, {}, "get", token);
      if (userData.user.username) {
          setUser(userData.user); // Set user state with fetched data
      } else {
          throw new Error(userData.error);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  // Function to authenticate user with provided credentials and set user/token state
  const authenticate = async (credentials) => {
    try {
      const data = await JoblyApi.request(`auth/token`, credentials, "post");
      if (data.token) {
        setToken(data.token);
        await fetchAndSetUser(credentials.username, data.token);
      } else {
        throw new Error(data.error.message);
      }
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  // Function to register a new user with provided info and set user/token state
  const register = async (userInfo) => {
    try {
      const data = await JoblyApi.request(`auth/register`, userInfo, "post");
      if (data.token) {
        setToken(data.token);
        await fetchAndSetUser(userInfo.username, data.token);
      } else {
        throw new Error(data.error.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  // Function to log out user by resetting user and token state
  const logout = () => {
    setUser({
      username: null,
      firstName: "",
      lastName: "",
      email: ""
    });
    setToken(null); // Reset token to null upon logout
  };

  // Aggregate state and functions into a value object
  const value = {
    user,
    setUser,
    token,
    setToken,
    fetchAndSetUser,
    authenticate,
    register,
    logout,
    loading,
    appliedJobs,
    applyToJob,
    hasAppliedToJob, 
  };

  // Provide User Context value to children components
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
