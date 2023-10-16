import React from 'react';
import { useAuth } from '../AuthContext';
import LoginPage from './LoginPage';
import RickAndMorty from './RickAndMorty';

function MainPage() {
  const { loggedIn } = useAuth();

  return (
    <main>
      {loggedIn ? <RickAndMorty /> : <LoginPage />}
    </main>
  );
}

export default MainPage;
