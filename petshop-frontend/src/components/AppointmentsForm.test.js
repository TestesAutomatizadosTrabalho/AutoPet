// AppointmentsForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentsForm from './AppointmentsForm';

describe('AppointmentsForm', () => {
  const mockOnNewAppointment = jest.fn();

  beforeEach(() => {
    mockOnNewAppointment.mockClear();
  });

  test('deve renderizar todos os campos corretamente', () => {
    render(<AppointmentsForm onNewAppointment={mockOnNewAppointment} />);

    expect(screen.getByLabelText('Data:')).toBeInTheDocument();
    expect(screen.getByLabelText('Hora:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descrição')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agendar/i })).toBeInTheDocument();
  });

  test('submete o formulário corretamente com todos os campos preenchidos', () => {
    render(<AppointmentsForm onNewAppointment={mockOnNewAppointment} />);

    fireEvent.change(screen.getByLabelText('Data:'), { target: { value: '2024-10-28' } });
    fireEvent.change(screen.getByLabelText('Hora:'), { target: { value: '14:00' } });
    fireEvent.change(screen.getByPlaceholderText('Descrição'), { target: { value: 'Consulta médica' } });

    fireEvent.click(screen.getByRole('button', { name: /agendar/i }));

    expect(mockOnNewAppointment).toHaveBeenCalledWith({
      date: new Date('2024-10-28T14:00'),
      description: 'Consulta médica',
    });

    expect(screen.getByTestId('success-message')).toHaveTextContent('Agendamento realizado com sucesso!');
  });

  test('limpa os campos após a submissão bem-sucedida', () => {
    render(<AppointmentsForm onNewAppointment={mockOnNewAppointment} />);

    fireEvent.change(screen.getByLabelText('Data:'), { target: { value: '2024-10-28' } });
    fireEvent.change(screen.getByLabelText('Hora:'), { target: { value: '14:00' } });
    fireEvent.change(screen.getByPlaceholderText('Descrição'), { target: { value: 'Consulta médica' } });

    fireEvent.click(screen.getByRole('button', { name: /agendar/i }));

    expect(screen.getByLabelText('Data:')).toHaveValue('');
    expect(screen.getByLabelText('Hora:')).toHaveValue('');
    expect(screen.getByPlaceholderText('Descrição')).toHaveValue('');
  });
});
