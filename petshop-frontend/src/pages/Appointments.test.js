// src/pages/Appointments.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Appointments from './Appointments';
import '@testing-library/jest-dom';

// Mock do AppointmentsForm
jest.mock('../components/AppointmentsForm', () => ({
  __esModule: true,
  default: ({ onNewAppointment }) => {
    let clickCount = 0;
    return (
      <button onClick={() => {
        clickCount++;
        onNewAppointment({
          id: Math.random(),
          date: clickCount === 1 ? new Date('2024-10-26T15:00:00') : new Date('2024-10-26T15:30:00'),
          description: 'Consulta com o veterinário',
        });
      }}>
        Agendar
      </button>
    );
  },
}));

describe('Appointments Page', () => {
  test('renderiza corretamente a página de Agendamentos', () => {
    render(<Appointments />);

    const title = screen.getByText(/Lista de Agendamentos/i);
    expect(title).toBeInTheDocument();
  });

  test('adiciona um novo agendamento com sucesso', async () => {
    render(<Appointments />);

    // Clica no botão de agendar (simulado pelo mock)
    fireEvent.click(screen.getByText(/Agendar/i));

    // Verifica se o novo agendamento foi adicionado corretamente
    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes('26/10/2024, 15:00') &&
          content.includes('Consulta com o veterinário')
        )
      ).toBeInTheDocument();
    });
  });

  test('exibe erro se tentar agendar com menos de 15 minutos de diferença', async () => {
    // Mock do alert
    window.alert = jest.fn();

    render(<Appointments />);

    // Primeiro agendamento
    fireEvent.click(screen.getByText(/Agendar/i));

    // Segundo agendamento em menos de 15 minutos
    fireEvent.click(screen.getByText(/Agendar/i));

    // Verifica se o alert foi chamado com a mensagem de erro correta
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Erro: Já existe um agendamento próximo a este horário (diferença menor que 15 minutos).'
      );
    });
  });

});
