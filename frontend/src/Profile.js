import React, { useState, useEffect } from "react";

function Profile({ user, updateUser }) {
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  useEffect(() => {
    console.log("user prop changed:", user);  
    setFormData({
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  console.log("formData state:", formData); 

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
