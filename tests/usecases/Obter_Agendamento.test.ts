import { ObterAgendamentoPorIdUseCase } from '../../src/usecase_agendamento/obter_agendamento';
import { IRepository } from '../../src/contracts/IRepository';
import { Agendamento } from '../../src/entities/Agendamento';

export class AgendamentoRepositoryMock implements IRepository<Agendamento> {
    private agendamentos: Agendamento[] = [];

    async getById(id: number): Promise<Agendamento | undefined> {
        const agendamento = this.agendamentos.find(a => a.id === id);
        return agendamento; 
    }

    async findAll(): Promise<Agendamento[]> {
        return this.agendamentos;
    }

    async save(entity: Agendamento): Promise<boolean> {
        this.agendamentos.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const index = this.agendamentos.findIndex(a => a.id === id);
        if (index === -1) return false;
        this.agendamentos.splice(index, 1);
        return true;
    }

    async update(id: number, entity: Agendamento): Promise<boolean> {
        const index = this.agendamentos.findIndex(a => a.id === id);
        if (index === -1) return false;
        this.agendamentos[index] = entity;
        return true;
    }

    async getByCPF(cpf: string): Promise<Agendamento | undefined> {
        // Adicionando uma implementação básica para satisfazer a interface
        throw new Error('Método getByCPF não suportado para Agendamento');
    }
}

describe('ObterAgendamentoPorIdUseCase', () => {
    let agendamentoRepository: AgendamentoRepositoryMock;
    let obterAgendamentoPorIdUseCase: ObterAgendamentoPorIdUseCase;

    beforeEach(() => {
        agendamentoRepository = new AgendamentoRepositoryMock();
        obterAgendamentoPorIdUseCase = new ObterAgendamentoPorIdUseCase(agendamentoRepository);
    });

    it('Deve retornar um agendamento existente pelo ID', async () => {
        const agendamento = new Agendamento();
        agendamento.id = 1;
        agendamento.data = new Date('2024-08-28');
        agendamento.userId = 123;
        agendamento.petId = 456;
        agendamento.servicoId = 789;

        await agendamentoRepository.save(agendamento);

        const result = await obterAgendamentoPorIdUseCase.execute(1);
        expect(result).toEqual(agendamento);
    });

    it('Deve retornar undefined se o agendamento não existir', async () => {
        const result = await obterAgendamentoPorIdUseCase.execute(999);
        expect(result).toBeUndefined();
    });
});
