import { useEffect, useState } from 'react';
import api from '../api/api';

interface Pet {
  id: number;
  nome: string;
  tipo: string;
}

const Pets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    api.get('/pets')
      .then((response) => setPets(response.data))
      .catch((error) => console.error('Erro ao buscar pets:', error));
  }, []);

  const handleAddPet = () => {
    api.post('/pets', { nome, tipo })
      .then(() => {
        setNome('');
        setTipo('');
        return api.get('/pets'); // Atualiza a lista
      })
      .then((response) => setPets(response.data))
      .catch((error) => console.error('Erro ao adicionar pet:', error));
  };

  return (
    <div>
      <h1>Pets</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.nome} - {pet.tipo}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nome do pet"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tipo do pet"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <button onClick={handleAddPet}>Adicionar Pet</button>
      </div>
    </div>
  );
};

export default Pets;
