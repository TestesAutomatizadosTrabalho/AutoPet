import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  console.log('Header renderizado'); // Adicione isso para ver se o Header está sendo renderizado corretamente
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pets">Pets</Link></li>
          <li><Link to="/agendamentos">Agendamentos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
