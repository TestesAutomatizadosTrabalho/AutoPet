import { Servico } from "entities/Servico";
import { IRepository } from "../contracts/IRepository";


export class ServicoRepo implements IRepository<Servico> {
    private lista: Servico[] = [];

    async getById(id: number): Promise<Servico> {
        const user = this.lista.find(c => c.id === id);
        if (!user) throw new Error('Usuário não encontrado');
        return user;
    }

    async findAll(): Promise<Servico[]> {
        return this.lista;
    }

    async save(entity: Servico): Promise<boolean> {
        this.lista.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const result = this.lista.filter(c => c.id !== id);
        if (result.length === this.lista.length) return false;
        return true;
    }
    
    async update(id: number, entity: Servico): Promise<boolean> {
        if(!this.lista.find(c => c.id === id)) return false;
        
        this.lista = this.lista.map(c => c.id === id ? entity : c);
        
        return true;
    }
}