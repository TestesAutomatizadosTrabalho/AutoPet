import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Pets from './pages/Pets';
import Appointments from './pages/Appointments';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/users">Users</Link> | 
          <Link to="/pets">Pets</Link> | 
          <Link to="/appointments">Appointments</Link>
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
