import React, { createContext, useContext, useReducer } from 'react';

const SearchContext = createContext();

const initialState = {
  characters: [], // Initial character data state
  // Add other state properties related to search, pagination, etc.
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload };
    // Add more cases to handle different actions and state updates
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

export default SearchContext; 
