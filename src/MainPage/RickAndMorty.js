import React, { useState, useEffect } from 'react';
import styles from './RickAndMorty.css'

function RickAndMorty() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch Rick and Morty character data here and update the 'characters' state
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseCharacterDetails = () => {
    setSelectedCharacter(null);
  };

  const handleSearch = () => {
    // Filter characters based on the search query
    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCharacters(filteredCharacters);
  };

  return (
    <div className={styles['rick-and-morty-app']}>
      <h2>Rick and Morty Characters</h2>
      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search for characters"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles['character-list']}>
        {characters.map((character) => (
          <div
            key={character.id}
            className={styles['character-card']} 
            onClick={() => handleCharacterClick(character)}
          >
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        
        <div className={styles['character-details']}>
          <button onClick={handleCloseCharacterDetails}>Close</button>
          <h2>{selectedCharacter.name}</h2>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
          {/* Add more character details here */}
        </div>
      )}
    </div>
  );
}

export default RickAndMorty;

