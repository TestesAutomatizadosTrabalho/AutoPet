import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PetUpdateForm from './PetUpdateForm';
import '@testing-library/jest-dom';
import React from 'react';

beforeEach(() => {
  //Mock do localStorage antes de cada teste
  const pets = [
    { id: 123, name: 'Fido' },
    { id: 456, name: 'Buddy' },
  ];
  localStorage.setItem('pets', JSON.stringify(pets));
});

test('renderiza o formulário de atualização de pet e envia os dados corretamente', async () => {
  //Mock da função onPetUpdated
  const mockOnPetUpdated = jest.fn();

  //Renderiza o componente com o mock da função
  render(<PetUpdateForm onPetUpdated={mockOnPetUpdated} />);

  const inputId = screen.getByPlaceholderText(/ID do Pet/i);
  const inputName = screen.getByPlaceholderText(/Novo Nome/i);
  const button = screen.getByText(/Atualizar Pet/i);

  //Verifica se os campos estão vazios inicialmente
  expect(inputId.value).toBe('');
  expect(inputName.value).toBe('');

  //Simula a entrada de dados nos inputs
  fireEvent.change(inputId, { target: { value: '123' } });
  fireEvent.change(inputName, { target: { value: 'Rex' } });

  //Verifica se os campos foram atualizados corretamente
  expect(inputId.value).toBe('123');
  expect(inputName.value).toBe('Rex');

  //Simula o clique no botão de envio
  fireEvent.click(button);

  //Verifica se a função onPetUpdated foi chamada com os dados atualizados
  await waitFor(() => expect(mockOnPetUpdated).toHaveBeenCalledWith(expect.any(Array)));

  //Verifica se a função foi chamada com um array (os dados atualizados não são relevantes para o teste)
  expect(mockOnPetUpdated).toHaveBeenCalled();

  //Verifica se o localStorage foi atualizado corretamente
  const updatedPets = JSON.parse(localStorage.getItem('pets'));
  const updatedPet = updatedPets.find(pet => pet.id === 123);
  expect(updatedPet).toEqual({ id: 123, name: 'Rex' }); 
});

test('não chama onPetUpdated em caso de falha na atualização', async () => {
  //Mock da função onPetUpdated
  const mockOnPetUpdated = jest.fn();

  //Renderiza o componente com o mock da função
  render(<PetUpdateForm onPetUpdated={mockOnPetUpdated} />);

  const inputId = screen.getByPlaceholderText(/ID do Pet/i);
  const inputName = screen.getByPlaceholderText(/Novo Nome/i);
  const button = screen.getByText(/Atualizar Pet/i);

  //Simula a entrada de dados nos inputs com um ID que não existe
  fireEvent.change(inputId, { target: { value: '999' } }); // ID que não está no localStorage
  fireEvent.change(inputName, { target: { value: 'Max' } });

  //Simula o clique no botão de envio
  fireEvent.click(button);

  //Aguarda que a função onPetUpdated não seja chamada devido ao erro
  await waitFor(() => expect(mockOnPetUpdated).not.toHaveBeenCalled());
});

test('utiliza um array vazio se não houver pets no localStorage', async () => {
  //Limpa o localStorage para simular a ausência de dados
  localStorage.removeItem('pets');

  const mockOnPetUpdated = jest.fn();
  
  render(<PetUpdateForm onPetUpdated={mockOnPetUpdated} />);

  const inputId = screen.getByPlaceholderText(/ID do Pet/i);
  const inputName = screen.getByPlaceholderText(/Novo Nome/i);
  const button = screen.getByText(/Atualizar Pet/i);

  //Simula entrada de dados
  fireEvent.change(inputId, { target: { value: '1' } });
  fireEvent.change(inputName, { target: { value: 'TestPet' } });

  fireEvent.click(button);

  //Verifica que a função de atualização não é chamada, pois o pet não existe
  await waitFor(() => expect(mockOnPetUpdated).not.toHaveBeenCalled());

  //Verifica se a mensagem "Pet não encontrado." é exibida
  const message = await screen.findByTestId('update-message');
  expect(message).toHaveTextContent('Pet não encontrado.');
});