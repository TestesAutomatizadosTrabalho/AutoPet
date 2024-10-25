import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        alert('Erro ao obter agendamentos.');
      }
    };
    fetchAppointments();
  }, []);

  return (
    <ul>
      {appointments.map((appt) => (
        <li key={appt.id}>
          {appt.date} - {appt.description}
        </li>
      ))}
    </ul>
  );
}

export default AppointmentsList;
