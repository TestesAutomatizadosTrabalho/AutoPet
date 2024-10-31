import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom';
import React from 'react';

test('renderiza corretamente a mensagem de boas-vindas', () => {
  render(<Home />);

  const welcomeMessage = screen.getByText(/Bem-vindo a AutoPet!/i);

  expect(welcomeMessage).toBeInTheDocument();
  expect(welcomeMessage).toHaveStyle('text-align: center; margin-top: 50px;');
});
