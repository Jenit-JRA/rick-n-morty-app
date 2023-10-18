import React from 'react';
import useAuth from '../../AuthContext';
import './Header.css';
import Button from '@mui/material/Button';

function Header() {
  const { loggedIn, logout } = useAuth();

  return (
    <header className='header-containor'>
      <h1>Rick And Morty UI</h1>
      {loggedIn && <Button onClick={logout} variant="outlined" color="error">Log out</Button>}
    </header>
  );
}

export default Header;
