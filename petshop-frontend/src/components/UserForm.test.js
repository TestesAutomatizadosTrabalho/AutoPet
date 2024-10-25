import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from './UserForm';
import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  window.alert = jest.fn();
});

test('renderiza o formulário de usuário e envia dados', async () => {

  axios.post.mockResolvedValueOnce({ data: { success: true } });

  render(<UserForm />);

  const inputNome = screen.getByPlaceholderText(/Nome/i);
  const inputEmail = screen.getByPlaceholderText(/Email/i);
  const button = screen.getByText(/Cadastrar/i);

  fireEvent.change(inputNome, { target: { value: 'John Doe' } });
  fireEvent.change(inputEmail, { target: { value: 'john@example.com' } });

  fireEvent.click(button);

  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

  expect(axios.post).toHaveBeenCalledWith('/api/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });

  expect(window.alert).toHaveBeenCalledWith('Usuário cadastrado com sucesso!');
});
