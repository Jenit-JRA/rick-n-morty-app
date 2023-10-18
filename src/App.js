
// import React from 'react';
// import { AuthProvider } from './AuthContext';
// import Header from './Components/Header/Header';
// import MainPage from './MainPage/MainPage';


// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Header />
//         <MainPage />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { AuthProvider } from './AuthContext';
import { SearchProvider } from './Services/SearchContext'; // Import the SearchProvider
import Header from './Components/Header/Header';
import MainPage from './MainPage/MainPage';

function App() {
  return (
    <AuthProvider>
      <SearchProvider> 
        <div className="App">
          <Header />
          <MainPage />
        </div>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
