import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Import a separate CSS file for better styling control
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login/', {
        username,
        password,
      });

      alert(response.data);

      const token = response.data.session_token;
      // Save the token in a cookie
      Cookies.set('authToken', token, { expires: 7 });


      // Redirect to an HTML file
      window.location.href = 'mss/telas/src/tLLS63QiWrqwR6MwI.html';
    } catch (error) {
      // alert(response.data);
      alert(error);
      //alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={() => navigate('/register')}>Go to Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
