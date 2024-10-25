import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Users from './pages/Users.js';
import Pets from './pages/Pets.js';
import Appointments from './pages/Appointments.js';

const navStyle = {
  backgroundColor: '#4CAF50', 
  padding: '10px',
  textAlign: 'center', 
};

const linkStyle = {
  color: 'white', 
  textDecoration: 'none', 
  margin: '0 15px', 
  fontSize: '18px', 
};

const activeLinkStyle = {
  fontWeight: 'bold', 
  textDecoration: 'underline', 
};

function App() {
  return (
    <Router>
      <div>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle} activeStyle={activeLinkStyle}>Home</Link> | 
          <Link to="/users" style={linkStyle} activeStyle={activeLinkStyle}>Users</Link> | 
          <Link to="/pets" style={linkStyle} activeStyle={activeLinkStyle}>Pets</Link> | 
          <Link to="/appointments" style={linkStyle} activeStyle={activeLinkStyle}>Appointments</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
