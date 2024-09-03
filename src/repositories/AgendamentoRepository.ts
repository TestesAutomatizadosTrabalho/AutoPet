import { Agendamento } from "entities/Agendamento";
import { IRepository } from "../contracts/IRepository";

export class AgendamentoRepo implements IRepository<Agendamento> {
    private lista: Agendamento[] = [];

    async getById(id: number): Promise<Agendamento> {
        const agendamento = this.lista.find(c => c.id === id);
        if (!agendamento) throw new Error('Agendamento não encontrado');
        return agendamento;
    }

    async findAll(): Promise<Agendamento[]> {
        return this.lista;
    }

    async save(entity: Agendamento): Promise<boolean> {
        this.lista.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const originalLength = this.lista.length;
        this.lista = this.lista.filter(c => c.id !== id);
        return this.lista.length < originalLength;
    }

    async update(id: number, entity: Agendamento): Promise<boolean> {
        const index = this.lista.findIndex(c => c.id === id);
        if (index === -1) return false;

        this.lista[index] = entity;
        return true;
    }

    async findByUserId(userId: number): Promise<Agendamento[]> {
        return this.lista.filter(c => c.userId === userId);
    }

    async findByPetId(petId: number): Promise<Agendamento[]> {
        return this.lista.filter(c => c.petId === petId);
    }
    async getByCPF(cpf: string): Promise<Agendamento | undefined> {
        return undefined;
    }
}
