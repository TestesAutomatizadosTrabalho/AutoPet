import React from 'react'; 
import UserForm from '../components/UserForm.js';

function Users() {
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
      <h2 style={titleStyle}>Cadastrar Usuário</h2>
      <UserForm />
    </div>
  );
}

export default Users;
