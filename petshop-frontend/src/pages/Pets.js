import React, { useState, useEffect } from 'react';
import PetCreateForm from '../components/PetCreateForm.js';
import PetUpdateForm from '../components/PetUpdateForm.js';

function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const savedPets = JSON.parse(localStorage.getItem('pets')) || [];
    setPets(savedPets);
  }, []);

  const handlePetAdded = (updatedPets) => {
    setPets(updatedPets);
  };

  const handlePetUpdated = (updatedPets) => {
    setPets(updatedPets);
  };

  const handleResetPets = () => {
    //Limpa o LocalStorage e atualiza o estado
    localStorage.removeItem('pets');
    setPets([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Cadastrar Novo Pet</h2>
      <PetCreateForm onPetAdded={handlePetAdded} />
      <h2>Atualizar Pet</h2>
      <PetUpdateForm onPetUpdated={handlePetUpdated} />

      <h2>Pets Cadastrados</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {pets.map((pet) => (
          <li key={pet.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
            <strong>ID:</strong> {pet.id} <br />
            <strong>Nome:</strong> {pet.name} <br />
            <strong>Raça:</strong> {pet.breed} <br />
            <strong>Email do Dono:</strong> {pet.ownerEmail}
          </li>
        ))}
      </ul>

      <button 
        onClick={handleResetPets} 
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Resetar Pets
      </button>
    </div>
  );
}

export default Pets;
