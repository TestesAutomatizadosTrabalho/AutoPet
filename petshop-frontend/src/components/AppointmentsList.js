// src/components/AppointmentsList.js
import React from 'react';

function AppointmentsList({ appointments }) {
  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
  };

  if (appointments.length === 0) {
    return <p>No appointments available</p>;
  }

  return (
    <ul>
      {appointments.map((appt) => (
        <li key={appt.id}>
          {formatDate(appt.date)} - {appt.description}
        </li>
      ))}
    </ul>
  );
}

export default AppointmentsList;
