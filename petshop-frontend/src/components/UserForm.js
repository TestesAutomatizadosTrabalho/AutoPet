import React, { useState } from 'react';

function UserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setName('');
    setEmail('');
    onUserAdded(updatedUsers);

    setMessage('Usuário cadastrado com sucesso!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>

      {message && <div data-testid="user-message">{message}</div>}
    </form>
  );
}

export default UserForm;
