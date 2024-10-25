import React, { useState } from 'react';
import axios from 'axios';

function PetUpdateForm() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/pets/${id}`, { name });
      alert('Pet atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar pet.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID do Pet"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Novo Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Atualizar Pet</button>
    </form>
  );
}

export default PetUpdateForm;
