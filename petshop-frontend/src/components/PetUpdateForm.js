import React, { useState } from 'react';

function PetUpdateForm({ onPetUpdated }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPets = JSON.parse(localStorage.getItem('pets')) || [];

    //Verifica se o pet existe antes de atualizar
    const petExists = existingPets.some((pet) => pet.id === parseInt(id));
    if (petExists) {
      const updatedPets = existingPets.map((pet) =>
        pet.id === parseInt(id) ? { ...pet, name } : pet
      );

      localStorage.setItem('pets', JSON.stringify(updatedPets));
      onPetUpdated(updatedPets);

      //Exibe mensagem de sucesso por 3 segundos
      setMessage('Pet atualizado com sucesso!');
    } else {
      //Não faz console.error, apenas atualiza a mensagem
      setMessage('Pet não encontrado.');
    }

    //Limpa os campos após a tentativa de atualização
    setId('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID do Pet"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Novo Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Atualizar Pet</button>

      {message && <div data-testid="update-message">{message}</div>}
    </form>
  );
}

export default PetUpdateForm;
