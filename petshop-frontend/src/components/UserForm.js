import React, { useState, useEffect } from 'react';

function UserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };

    // Obtém usuários do LocalStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Adiciona o novo usuário e salva novamente no LocalStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Limpa os campos e notifica o componente pai
    setName('');
    setEmail('');
    onUserAdded(updatedUsers);
    alert('Usuário cadastrado com sucesso!');
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
    </form>
  );
}

export default UserForm;
