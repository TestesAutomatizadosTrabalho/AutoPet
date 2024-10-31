import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm.js';

function Users() {
  const [users, setUsers] = useState([]);

  // Carregar usuários do LocalStorage ao montar o componente
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleUserAdded = (updatedUsers) => {
    setUsers(updatedUsers); // Atualiza a lista de usuários após novo cadastro
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

  const userListStyle = {
    marginTop: '30px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Cadastrar Usuário</h2>
      <UserForm onUserAdded={handleUserAdded} />
      <div style={userListStyle}>
        <h3>Usuários Cadastrados:</h3>
        {users.length === 0 ? (
          <p>Nenhum usuário cadastrado.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <strong>Nome:</strong> {user.name} <br />
                <strong>Email:</strong> {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Users;
