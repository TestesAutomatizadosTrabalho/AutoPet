import { IRepository } from '../contracts/IRepository';
import { Agendamento } from '../entities/Agendamento';

export class ObterAgendamentoPorIdUseCase {
    constructor(private agendamentoRepository: IRepository<Agendamento>) {}

    async execute(id: number): Promise<Agendamento | undefined> {
        return this.agendamentoRepository.getById(id);
    }
}
