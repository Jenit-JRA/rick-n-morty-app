
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      width:'100%',
      height:'100%',
      alignSelf:'center',
       }}>
    
    <Grid
      container spacing={2}
      >
      <Grid item xs={12}>
        <TextField
        fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailInputRef}
          id="standard-basic"
          label="Enter your Email"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
        fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="standard-basic"
          label="Password"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <Button 
        onClick={handleLogin} 
        variant="contained"
        fullWidth
        >Login</Button>
      </Grid>
    </Grid>
    </div>
  );
}

export default LoginPage;


