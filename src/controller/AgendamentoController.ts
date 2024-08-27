
import { Agendamento } from '../entities/Agendamento';
import { IController } from 'contracts/IController';

export class AgendamentoController implements IController<Agendamento> {
  private agendamentos: Agendamento[] = []; // Simulando um banco de dados com um array

  create(agendamento: Agendamento): Agendamento {
    this.agendamentos.push(agendamento);
    return agendamento;
  }

  getById(id: number): Agendamento | undefined {
    return this.agendamentos.find(agendamento => agendamento.id === id);
  }

  update(id: number, updatedAgendamentoData: Partial<Agendamento>): Agendamento | undefined {
    const agendamento = this.getById(id);
    if (!agendamento) {
      return undefined;
    }

    Object.assign(agendamento, updatedAgendamentoData);
    return agendamento;
  }

  delete(id: number): boolean {
    const index = this.agendamentos.findIndex(agendamento => agendamento.id === id);
    if (index !== -1) {
      this.agendamentos.splice(index, 1);
      return true;
    }
    return false;
  }

  list(): Agendamento[] {
    return this.agendamentos;
  }

  getByUserId(userId: number): Agendamento[] {
    return this.agendamentos.filter(agendamento => agendamento.userId === userId);
  }

  getByServicoId(servicoId: number): Agendamento[] {
    return this.agendamentos.filter(agendamento => agendamento.servicoId === servicoId);
  }

  getByPetId(petId: number): Agendamento[] {
    return this.agendamentos.filter(agendamento => agendamento.petId === petId);
  }
}
