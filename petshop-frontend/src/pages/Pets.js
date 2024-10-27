import PetUpdateForm from '../components/PetUpdateForm.js';
import React from 'react';  

function Pets() {
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
      <h2 style={titleStyle}>Atualizar Pet</h2>
      <PetUpdateForm />
    </div>
  );
}

export default Pets;
