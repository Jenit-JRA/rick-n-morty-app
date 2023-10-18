
import React, { useEffect, useState } from 'react';
import { useSearch } from '../Services/SearchContext';
import './RickAndMorty.css';

function RickAndMorty() {
  const { state, dispatch } = useSearch();
  const [searchInput, setSearchInput] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 20;
  const totalPages = 42;

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

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchInput.toLowerCase()) &&
    (searchGender === '' || character.gender === searchGender) &&
    (searchStatus === '' || character.status === searchStatus)
  );

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
      // If the same character card is clicked again, hide the details
      setSelectedCharacter(null);
    } else {
      setSelectedCharacter(character);
    }
  };

  return (
    <div className='rick-and-morty-app'>
      <h2>Rick and Morty Characters</h2>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search for characters'
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
      </div>
      <div className='character-list'>
        {charactersToDisplay.map((character) => (
          <div key={character.id} className='character-card'>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <button onClick={() => handleShowDetails(character)}>
              {selectedCharacter && selectedCharacter.id === character.id
                ? 'Hide Details'
                : 'Show Details'}
            </button>
            {selectedCharacter && selectedCharacter.id === character.id && (
              <div className='character-details'>
                <h2>{selectedCharacter.name}</h2>
                <p>Status: {selectedCharacter.status}</p>
                <p>Species: {selectedCharacter.species}</p>
                {/* Add more character details here */}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div className="page-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

export default RickAndMorty;







