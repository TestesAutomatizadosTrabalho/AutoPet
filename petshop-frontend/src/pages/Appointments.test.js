import { render, screen } from '@testing-library/react';
import React from 'react';  
import Appointments from './Appointments';
import '@testing-library/jest-dom';

// Mock do AppointmentsList para evitar dependências
jest.mock('../components/AppointmentsList.js', () => () => (
  <div>Mocked AppointmentsList</div>
));

test('renderiza corretamente a página de Agendamentos', () => {
  render(<Appointments />);

  // Verifica se o título está presente
  const pageTitle = screen.getByText(/Lista de Agendamentos/i);
  expect(pageTitle).toBeInTheDocument();

  // Verifica se o componente AppointmentsList foi renderizado
  const appointmentList = screen.getByText(/Mocked AppointmentsList/i);
  expect(appointmentList).toBeInTheDocument();
});
