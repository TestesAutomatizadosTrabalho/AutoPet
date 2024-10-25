import { useEffect, useState } from 'react';
import api from '../api/api';

interface Agendamento {
  id: number;
  pet: string;
  servico: string;
  data: string;
}

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [pet, setPet] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    api.get('/agendamentos')
      .then((response) => setAgendamentos(response.data))
      .catch((error) => console.error('Erro ao buscar agendamentos:', error));
  }, []);

  const handleAddAgendamento = () => {
    api.post('/agendamentos', { pet, servico, data })
      .then(() => {
        setPet('');
        setServico('');
        setData('');
        return api.get('/agendamentos'); // Atualiza a lista
      })
      .then((response) => setAgendamentos(response.data))
      .catch((error) => console.error('Erro ao adicionar agendamento:', error));
  };

  return (
    <div>
      <h1>Agendamentos</h1>
      <ul>
        {agendamentos.map((ag) => (
          <li key={ag.id}>
            {ag.pet} - {ag.servico} em {ag.data}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nome do pet"
          value={pet}
          onChange={(e) => setPet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={handleAddAgendamento}>Adicionar Agendamento</button>
      </div>
    </div>
  );
};

export default Agendamentos;
