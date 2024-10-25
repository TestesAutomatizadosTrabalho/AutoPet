import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PetUpdateForm from './PetUpdateForm';
import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';

// Mock do axios
jest.mock('axios');

// Mock do window.alert
beforeAll(() => {
  window.alert = jest.fn();
});

test('renderiza o formulário de atualização de pet e envia os dados corretamente', async () => {
  // Simula uma resposta de sucesso da API
  axios.put.mockResolvedValueOnce({ data: { success: true } });

  render(<PetUpdateForm />);

  const inputId = screen.getByPlaceholderText(/ID do Pet/i);
  const inputName = screen.getByPlaceholderText(/Novo Nome/i);
  const button = screen.getByText(/Atualizar Pet/i);

  // Simula a entrada de dados nos inputs
  fireEvent.change(inputId, { target: { value: '123' } });
  fireEvent.change(inputName, { target: { value: 'Rex' } });

  // Simula o clique no botão de envio
  fireEvent.click(button);

  // Aguarda a chamada da API
  await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));

  // Verifica se a chamada do axios.put foi feita com os parâmetros corretos
  expect(axios.put).toHaveBeenCalledWith('/api/pets/123', {
    name: 'Rex',
  });

  // Verifica se o alerta foi exibido com a mensagem correta
  expect(window.alert).toHaveBeenCalledWith('Pet atualizado com sucesso!');
});

test('exibe alerta de erro em caso de falha na atualização', async () => {
  // Simula uma resposta de erro da API
  axios.put.mockRejectedValueOnce(new Error('Erro'));

  render(<PetUpdateForm />);

  const inputId = screen.getByPlaceholderText(/ID do Pet/i);
  const inputName = screen.getByPlaceholderText(/Novo Nome/i);
  const button = screen.getByText(/Atualizar Pet/i);

  // Simula a entrada de dados nos inputs
  fireEvent.change(inputId, { target: { value: '456' } });
  fireEvent.change(inputName, { target: { value: 'Max' } });

  // Simula o clique no botão de envio
  fireEvent.click(button);

  // Aguarda a exibição do alerta de erro
  await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Erro ao atualizar pet.'));
});
