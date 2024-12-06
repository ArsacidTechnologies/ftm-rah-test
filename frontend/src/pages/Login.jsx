import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {  // Accept onLogin prop
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.isSuccessful) {
        const authToken = response.data.data.authToken;
        localStorage.setItem('authToken', authToken);  // Store the token

        alert('Login successful!');
        onLogin();  // Trigger the onLogin prop to notify App.js

        navigate('/userdetail');  // Redirect to the user detail page after login
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      alert('An error occurred during login');
      console.error('Login error:', error);
    }
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response.data.isSuccessful) {
        alert('Signup successful! Your token: ' + response.data.authToken);
      } else {
        alert('Signup failed: ' + response.data.message);
      }
    } catch (error) {
      alert('An error occurred during signup: ' + (error.response?.data?.message || error.message));
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input type="text" placeholder="Your name" name="username" value={formData.username} onChange={changeHandler} />
          ) : null}
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} />
        </div>

        <button onClick={(e) => { state === "Login" ? login(e) : signup(e) }}>Continue</button>

        {state === "Login" ? (
          <p className="loginsignup-login">Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
        ) : (
          <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

