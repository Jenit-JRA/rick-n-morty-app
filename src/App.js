// src/App.js
import React from 'react';
// import AuthProvider from '../components/AuthContext'; // Corrected import path
// import {Header} from './Components/Header';
// import MainPage from '../components/MainPage/MainPage'; // Corrected import path
import { AuthProvider } from './AuthContext';
import Header from './Components/Header/Header';
import MainPage from './MainPage/MainPage';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <MainPage />
      </div>
    </AuthProvider>
  );
}

export default App;

