import React from 'react';
import useAuth from '../../AuthContext';

function Header() {
  const { loggedIn, logout } = useAuth();

  return (
    <header>
      <h1>Welcome to Rick And Morty UI</h1>
      {loggedIn && <button onClick={logout}>Logout</button>}
    </header>
  );
}

export default Header;
