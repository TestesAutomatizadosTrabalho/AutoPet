import { render, screen } from '@testing-library/react';
import Users from './Users';
import UserForm from '../components/UserForm';
import '@testing-library/jest-dom';
import React from 'react';

// Mock do UserForm para garantir que ele é renderizado corretamente
jest.mock('../components/UserForm', () => () => <div>Mocked UserForm</div>);

test('renderiza corretamente a página de usuários', () => {
  render(<Users />);

  const pageTitle = screen.getByText(/Cadastrar Usuário/i);
  const userForm = screen.getByText(/Mocked UserForm/i);

  // Verifica se o título foi renderizado
  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle).toHaveStyle('font-size: 24px; margin-bottom: 20px; color: #333;');

  // Verifica se o componente UserForm foi renderizado
  expect(userForm).toBeInTheDocument();
});
