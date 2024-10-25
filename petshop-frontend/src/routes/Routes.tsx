import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Pets from '../pages/Pets';
import Agendamentos from '../pages/Agendamentos';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/agendamentos" element={<Agendamentos />} />
    </Routes>
  </Router>
);

export default AppRoutes;
