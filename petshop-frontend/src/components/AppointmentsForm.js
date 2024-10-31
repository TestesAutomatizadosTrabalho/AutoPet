import React, { useState } from 'react';

function AppointmentsForm({ onNewAppointment }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewAppointment({
      date: new Date(`${date}T${time}`),
      description,
    });
    setDate('');
    setTime('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Formulário de agendamento">
      <div>
        <label htmlFor="date">Data:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="time">Hora:</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <input
          id="description"
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agendar</button>
    </form>
  );
}

export default AppointmentsForm;
