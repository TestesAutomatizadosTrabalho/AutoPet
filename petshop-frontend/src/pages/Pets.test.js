import { render, screen } from '@testing-library/react';
import React from 'react';  
import Pets from './Pets';
import '@testing-library/jest-dom';

// Mock do PetUpdateForm para evitar dependências
jest.mock('../components/PetUpdateForm.js', () => () => (
  <div>Mocked PetUpdateForm</div>
));

test('renderiza corretamente a página de Pets', () => {
  render(<Pets />);

  // Verifica se o título está presente
  const pageTitle = screen.getByText(/Atualizar Pet/i);
  expect(pageTitle).toBeInTheDocument();

  // Verifica se o componente PetUpdateForm foi renderizado
  const petForm = screen.getByText(/Mocked PetUpdateForm/i);
  expect(petForm).toBeInTheDocument();
});
