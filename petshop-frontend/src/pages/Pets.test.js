import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pets from './Pets';

//Limpa o LocalStorage antes de cada teste
beforeEach(() => {
  localStorage.clear();
});

describe('Pets Component', () => {

  test('exibe pets armazenados no LocalStorage', async () => {
    const mockPets = [
      { id: 1, name: 'Buddy', breed: 'Golden Retriever', ownerEmail: 'owner1@example.com' },
      { id: 2, name: 'Luna', breed: 'Labrador', ownerEmail: 'owner2@example.com' },
    ];
    localStorage.setItem('pets', JSON.stringify(mockPets));

    render(<Pets />);

    //Usar uma função como matcher para localizar o texto
    await waitFor(() => {
      mockPets.forEach(pet => {
        expect(screen.getByText((content) => content.includes(pet.name))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes(pet.breed))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes(pet.ownerEmail))).toBeInTheDocument();
      });
    });
  });

  test('cadastra um novo pet corretamente', async () => {
    render(<Pets />);

    const nameInput = screen.getByPlaceholderText('Nome do Pet'); //Verifique se este placeholder está correto
    const breedInput = screen.getByPlaceholderText('Raça do Pet'); 
    const emailInput = screen.getByPlaceholderText('E-mail do Dono'); 
    const addButton = screen.getByRole('button', { name: /cadastrar/i }); 

    fireEvent.change(nameInput, { target: { value: 'Charlie' } });
    fireEvent.change(breedInput, { target: { value: 'Beagle' } });
    fireEvent.change(emailInput, { target: { value: 'owner3@example.com' } });
    fireEvent.click(addButton);

    //Aguarda a renderização do novo pet
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Charlie'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Beagle'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('owner3@example.com'))).toBeInTheDocument();
    });

    //Verifica se o pet foi salvo no LocalStorage
    const storedPets = JSON.parse(localStorage.getItem('pets'));
    expect(storedPets).toEqual([{ id: expect.any(Number), name: 'Charlie', breed: 'Beagle', ownerEmail: 'owner3@example.com' }]); // O ID deve ser gerado no componente
  });

  test('limpa a lista de pets corretamente ao clicar em Resetar Pets', async () => {
    const mockPets = [
      { id: 1, name: 'Buddy', breed: 'Golden Retriever', ownerEmail: 'owner1@example.com' },
      { id: 2, name: 'Luna', breed: 'Labrador', ownerEmail: 'owner2@example.com' },
    ];
    localStorage.setItem('pets', JSON.stringify(mockPets));

    render(<Pets />);

    //Aguarda a lista ser renderizada
    await waitFor(() => {
      mockPets.forEach(pet => {
        expect(screen.getByText((content) => content.includes(pet.name))).toBeInTheDocument();
      });
    });

    const resetButton = screen.getByRole('button', { name: /resetar pets/i }); 
    fireEvent.click(resetButton);

    //Verifica se os pets foram removidos
    await waitFor(() => {
      mockPets.forEach(pet => {
        expect(screen.queryByText((content) => content.includes(pet.name))).not.toBeInTheDocument();
      });
    });

    //Verifica se o localStorage foi limpo
    expect(localStorage.getItem('pets')).toBeNull();
  });

});

test('atualiza o estado de pets corretamente ao atualizar um pet', async () => {
  const initialPets = [
    { id: 1, name: 'Buddy', breed: 'Golden Retriever', ownerEmail: 'owner1@example.com' },
    { id: 2, name: 'Luna', breed: 'Labrador', ownerEmail: 'owner2@example.com' },
  ];
  localStorage.setItem('pets', JSON.stringify(initialPets));

  render(<Pets />);

  // Aguarda a renderização inicial
  await waitFor(() => {
    expect(screen.getByText((content) => content.includes('Buddy'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Luna'))).toBeInTheDocument();
  });

  // Simula a atualização do pet com ID 1 para o nome 'Max'
  const inputId = screen.getByPlaceholderText(/ID do Pet/i);
  const inputName = screen.getByPlaceholderText(/Novo Nome/i);
  const updateButton = screen.getByRole('button', { name: /Atualizar Pet/i });

  fireEvent.change(inputId, { target: { value: '1' } });
  fireEvent.change(inputName, { target: { value: 'Max' } });
  fireEvent.click(updateButton);

  // Verifica se a interface foi atualizada corretamente
  await waitFor(() => {
    expect(screen.getByText((content) => content.includes('Max'))).toBeInTheDocument();
    expect(screen.queryByText((content) => content.includes('Buddy'))).not.toBeInTheDocument();
  });

  // Verifica o estado no localStorage
  const updatedPets = JSON.parse(localStorage.getItem('pets'));
  expect(updatedPets).toEqual([
    { id: 1, name: 'Max', breed: 'Golden Retriever', ownerEmail: 'owner1@example.com' },
    { id: 2, name: 'Luna', breed: 'Labrador', ownerEmail: 'owner2@example.com' },
  ]);
});
