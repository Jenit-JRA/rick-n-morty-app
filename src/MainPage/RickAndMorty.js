

import React, { useEffect, useState } from 'react';
import { useSearch } from '../Services/SearchContext';
import './RickAndMorty.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function RickAndMorty() {
  const { state, dispatch } = useSearch();
  const [searchInput, setSearchInput] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 20;
  const totalPages = 42;
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);

  const { characters } = state;

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const allCharacters = [];
      for (let page = 1; page <= totalPages; page++) {
        const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&per_page=${charactersPerPage}`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          allCharacters.push(...data.results);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
      dispatch({ type: 'SET_CHARACTERS', payload: allCharacters });
    };

    fetchAllCharacters();
  }, [totalPages, charactersPerPage, dispatch]);

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const handleGenderInputChange = (event) => {
    const { value } = event.target;
    setSearchGender(value);
  };

  const handleStatusInputChange = (event) => {
    const { value } = event.target;
    setSearchStatus(value);
  };


  const handleSearchButton = () => {
    setSearchButtonPressed(true);
    setCurrentPage(1);
  };
  const filteredCharacters = searchButtonPressed
    ? characters.filter((character) =>
      character.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (searchGender === '' || character.gender === searchGender) &&
      (searchStatus === '' || character.status === searchStatus)
    )
    : characters;

  const charactersToDisplay = filteredCharacters.slice(
    (currentPage - 1) * charactersPerPage,
    currentPage * charactersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleShowDetails = (character) => {
    if (selectedCharacter && selectedCharacter.id === character.id) {
      setSelectedCharacter(null);
    } else {
      setSelectedCharacter(character);
    }
  };

  return (
    <div className='rick-and-morty-app'>
      <Grid
        boxShadow={2}
        padding={5}
        gap={2}
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'row'}
      >
        <TextField
          id="outlined-search"
          label="Search for your characters"
          type="search"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <select onChange={handleGenderInputChange} value={searchGender}>
          <option value=''>All Genders</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Genderless'>Genderless</option>
          <option value='unknown'>Unknown</option>
        </select>
        <select onChange={handleStatusInputChange} value={searchStatus}>
          <option value=''>All Statuses</option>
          <option value='Alive'>Alive</option>
          <option value='Dead'>Dead</option>
          <option value='unknown'>Unknown</option>
        </select>
        <Button
          variant="outlined"
          onClick={handleSearchButton}
        >
          Search
        </Button>
      </Grid>
      <div className='character-list'>
        {charactersToDisplay.map((character) => (
          <div key={character.id} className='character-card'>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <Button
              variant="outlined"
              onClick={() => handleShowDetails(character)}>
              {selectedCharacter && selectedCharacter.id === character.id
                ? 'Hide Details'
                : 'Show Details'}
            </Button>
            {selectedCharacter && selectedCharacter.id === character.id && (
              <div className='character-details'>
                <h2>{selectedCharacter.name}</h2>
                <p>Status: {selectedCharacter.status}</p>
                <p>Species: {selectedCharacter.species}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <Button
          variant="outlined"
          onClick={handlePrevPage}
          disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

export default RickAndMorty;








