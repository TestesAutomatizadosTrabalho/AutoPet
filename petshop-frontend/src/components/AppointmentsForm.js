// AppointmentsForm.js
import React, { useState } from 'react';

export default function AppointmentsForm({ onNewAppointment }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      date: new Date(`${date}T${time}`),
      description,
    };

    onNewAppointment(appointment);
    setSuccessMessage('Agendamento realizado com sucesso!');
    
    //Limpando os campos após a submissão
    setDate('');
    setTime('');
    setDescription('');
    
    //Removendo a mensagem de sucesso após alguns segundos
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Data:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Hora:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Agendar</button>

      {successMessage && <div data-testid="success-message">{successMessage}</div>}
    </form>
  );
}
