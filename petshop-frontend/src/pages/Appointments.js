import AppointmentsList from '../components/AppointmentsList.js';

function Appointments() {
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
      <AppointmentsList />
    </div>
  );
}

export default Appointments;
