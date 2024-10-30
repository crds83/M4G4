import React, { useEffect, useState } from 'react';
import Modal from './Modal';
//import './CharacterCard.css';
import './App.css'; 

interface Character {
  id: number;
  fullName: string;
  title: string;
  family: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
}

const App: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => { //this hook runs the component mounts and is used to trigger the fetchCharacters function.
    const fetchCharacters = async () => { //its function is to fetch character date from an external API endpoint
      try {
        const response = await fetch('https://thronesapi.com/api/v2/Characters');
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  /*const openModal = (character: Character) => { //openModal function sets selectedCharacter to the clicked character, which opens the modal and shows more details abut the character.
    setSelectedCharacter(character);
  };
*/
  const closeModal = () => {  //The closeModal function sets selectedCharacter back to null, which closes the modal since the component is no longer displaying any character details.
    setSelectedCharacter(null);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
    {characters.map(character => (
      <div className="character-card" key={character.id}>
        <img src={character.imageUrl} alt={character.fullName} />
        <div className="character-name">{character.fullName}</div>
        <div className="character-title">{character.title}</div>
        <div className="character-family">Family: {character.family}</div>
      </div>
        ))}
    <Modal isOpen={!!selectedCharacter} onClose={closeModal}> //The state variable selectedCharacter is used to determine whether the modal should be open and what character’s data it should display.
        {selectedCharacter && (
          <div>
            <h2>{selectedCharacter.fullName}</h2>
            <p><strong>Title:</strong> {selectedCharacter.title}</p>
            <p><strong>Family:</strong> {selectedCharacter.family}</p>
            <p><strong>First Name:</strong> {selectedCharacter.firstName}</p>
            <p><strong>Last Name:</strong> {selectedCharacter.lastName}</p>
            <img src={selectedCharacter.imageUrl} alt={selectedCharacter.fullName} style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        )}
      </Modal>  


    </div>
  );
};

export default App;
