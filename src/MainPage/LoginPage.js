
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInputRef = useRef();

  const isEmailValid = (email) => {
   
    return email.includes('@');
  };

  const isPasswordValid = (password) => {
    return password.length >= 7;
  };

  const handleLogin = () => {
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      alert('Please provide a valid email and a password of at least 7 characters.');
      return;
    }

    login();
  };

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        ref={emailInputRef}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;


