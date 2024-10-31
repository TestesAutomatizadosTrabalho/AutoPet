import React, { useState } from 'react';

function PetCreateForm({ onPetAdded }) {
  const [ownerEmail, setOwnerEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    //Criando o novo pet com um ID único
    const newPet = { id: Date.now(), ownerEmail, name: petName, breed };

    //Pegando os pets do LocalStorage
    const existingPets = JSON.parse(localStorage.getItem('pets')) || [];

    //COlocando o novo pet e salvando ele novamente no LocalStorage
    const updatedPets = [...existingPets, newPet];
    localStorage.setItem('pets', JSON.stringify(updatedPets));

    //LImpando os campos e notifica o componente pai
    setOwnerEmail('');
    setPetName('');
    setBreed('');
    onPetAdded(updatedPets);

    //Exibindo mensagem de sucesso por 3 segundos
    setSuccessMessage('Pet cadastrado com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-mail do Dono"
        value={ownerEmail}
        onChange={(e) => setOwnerEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome do Pet"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Raça do Pet"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        required
      />
      <button type="submit">Cadastrar Pet</button>

      {successMessage && <div data-testid="success-message">{successMessage}</div>}
    </form>
  );
}

export default PetCreateForm;
