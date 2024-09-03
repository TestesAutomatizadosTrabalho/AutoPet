import { Servico } from "entities/Servico";
import { IRepository } from "../contracts/IRepository";

export class ServicoRepo implements IRepository<Servico> {
    private lista: Servico[] = [];

    async getById(id: number): Promise<Servico> {
        const servico = this.lista.find(servico => servico.id === id);
        if (!servico) throw new Error('Serviço não encontrado');
        return servico;
    }

    async findAll(): Promise<Servico[]> {
        return this.lista;
    }

    async save(entity: Servico): Promise<boolean> {
        this.lista.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const originalLength = this.lista.length;
        this.lista = this.lista.filter(servico => servico.id !== id);
        return this.lista.length < originalLength;
    }
    
    async update(id: number, entity: Servico): Promise<boolean> {
        const index = this.lista.findIndex(servico => servico.id === id);
        if (index === -1) return false;

        this.lista[index] = entity;
        return true;
    }

    async getByCPF(cpf: string): Promise<Servico | undefined> {
        return undefined;
    }
}
