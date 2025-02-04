
import React, { useState } from 'react';
import '../styles/Register.css'; 
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [userRole, setUserRole] = useState('regular');
    const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (role: string) => {
      setUserRole(role);
      console.log(role);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
          const response = await fetch('https://localhost:7234/api/Account/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  firstName: formData.firstname,
                  lastName: formData.lastname,
                  email: formData.email,
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
                  companyName: userRole === 'company' ? formData.companyName : "",
                  UserRole: userRole,
              }),
          });

          const data = await response.json();
          console.log(data);
          if (response.ok) {
              postMessage(data.message || 'Registration successful!');
              navigate('/login');
          } else {
              postMessage(data.message || 'Registration failed.');
          }
      } catch (err) {
          postMessage('An error occurred. Please try again later.');
      }
  };

  return (
    <div className="register-container">
      <h1 className="space-title">🚀 Welcome to Space Adventures Registration</h1>
      <div className="role-selector">
        <button
          className={userRole === 'regular' ? 'active' : ''}
          onClick={() => handleRoleChange('regular')}
        >
          Regular User
        </button>
        <button
          className={userRole === 'company' ? 'active' : ''}
          onClick={() => handleRoleChange('company')}
        >
          Company
        </button>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
        type="text"
        name="firstname"
        placeholder="First name"
        value={formData.firstname}
        onChange={handleChange}
        required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        />

        {userRole === 'company' && (
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" className="submit-button-reg">Register</button>
      </form>
    </div>
  );
};

export default Register;