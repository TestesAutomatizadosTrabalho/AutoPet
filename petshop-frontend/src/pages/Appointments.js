// src/pages/Appointments.test.js
import React, { useState } from 'react';
import AppointmentsList from '../components/AppointmentsList.js';
import AppointmentsForm from '../components/AppointmentsForm.js';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const isValidAppointment = (newDate) => {
    return appointments.every((appt) => {
      const diffInMs = Math.abs(newDate - appt.date);
      const diffInMinutes = diffInMs / (1000 * 60);  
      return diffInMinutes >= 15;
    });
  };

  const handleNewAppointment = (newAppointment) => {
    if (!isValidAppointment(newAppointment.date)) {
      alert('Erro: Já existe um agendamento próximo a este horário (diferença menor que 15 minutos).');
      return;
    }

    setAppointments((prev) => [...prev, newAppointment]);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Lista de Agendamentos</h2>
      <AppointmentsForm onNewAppointment={handleNewAppointment} />
      <AppointmentsList appointments={appointments} />
    </div>
  );
}

export default Appointments;
