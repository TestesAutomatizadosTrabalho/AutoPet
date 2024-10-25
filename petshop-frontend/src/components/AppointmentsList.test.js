// src/components/AppointmentsList.test.js
import React from 'react'; // Importar o React
import { render, screen, waitFor } from '@testing-library/react';
import AppointmentsList from './AppointmentsList';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock do axios
jest.mock('axios');

describe('AppointmentsList', () => {
  it('deve renderizar a lista de agendamentos', async () => {
    const mockAppointments = [
      { id: 1, date: '2024-10-01', description: 'Consulta com o veterinário' },
      { id: 2, date: '2024-10-02', description: 'Vacinação' },
    ];

    // Simulação da resposta do axios
    axios.get.mockResolvedValueOnce({ data: mockAppointments });

    // Renderiza o componente
    render(<AppointmentsList />);

    // Verifique se os elementos aparecem na tela
    await waitFor(() => {
      // Usando expressão regular para ignorar quebras de linha e espaços em branco
      expect(screen.getByText(/Consulta com o veterinário/i)).toBeInTheDocument();
      expect(screen.getByText(/Vacinação/i)).toBeInTheDocument();
    });
  });

  it('deve exibir alerta em caso de erro ao obter agendamentos', async () => {
    // Simulação de erro no axios
    axios.get.mockRejectedValueOnce(new Error('Erro ao obter agendamentos'));

    // Espione o alert
    window.alert = jest.fn();

    // Renderiza o componente
    render(<AppointmentsList />);

    // Aguarde e verifique se o alerta é chamado
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Erro ao obter agendamentos.');
    });
  });
});
