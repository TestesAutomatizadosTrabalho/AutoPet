import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentsList from './AppointmentsList';

describe('AppointmentsList', () => {
  test('should render a list of appointments with formatted dates', () => {
    const appointments = [
      { id: 1, date: '2024-10-20T10:30:00', description: 'Consultation with Dr. Smith' },
      { id: 2, date: '2024-11-15T15:00:00', description: 'Follow-up appointment' },
    ];

    render(<AppointmentsList appointments={appointments} />);

    expect(screen.getByText('20/10/2024, 10:30 - Consultation with Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('15/11/2024, 15:00 - Follow-up appointment')).toBeInTheDocument();
  });

  test('should render an empty message when there are no appointments', () => {
    render(<AppointmentsList appointments={[]} />);
    expect(screen.getByText('No appointments available')).toBeInTheDocument();
  });
});
