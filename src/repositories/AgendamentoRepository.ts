import { Agendamento } from "entities/Agendamento";
import { IRepository } from "../contracts/IRepository";


export class AgendamentoRepo implements IRepository<Agendamento> {
    private lista: Agendamento[] = [];

    async getById(id: number): Promise<Agendamento> {
        const user = this.lista.find(c => c.id === id);
        if (!user) throw new Error('Usuário não encontrado');
        return user;
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
        if(!this.lista.find(c => c.id === id)) return false;
        
        this.lista = this.lista.map(c => c.id === id ? entity : c);
        
        return true;
    }

    async findByUserId(userId: number): Promise<Agendamento[]> {
        return this.lista.filter(c => c.userId === userId);
    }

    async findByPetId(petId: number): Promise<Agendamento[]> {
        return this.lista.filter(c => c.petId === petId);
    }
}