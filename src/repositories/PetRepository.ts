import { Pet } from "entities/Pet";
import { IRepository } from "../contracts/IRepository";

export class PetRepo implements IRepository<Pet> {
    private lista: Pet[] = [];

    async getById(id: number): Promise<Pet> {
        const pet = this.lista.find(c => c.id === id);
        if (!pet) throw new Error('Usuário não encontrado');
        return pet;
    }

    async findAll(): Promise<Pet[]> {
        return this.lista;
    }

    async save(entity: Pet): Promise<boolean> {
        this.lista.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const result = this.lista.filter(c => c.id !== id);
        if (result.length === this.lista.length) return false;
        return true;
    }
    
    async findByName(nome: string): Promise<Pet[]> {
        return this.lista.filter(c => c.nome === nome);
    }

    async update(id: number, entity: Pet): Promise<boolean> {
        if(!this.lista.find(c => c.id === id)) return false;

        this.lista = this.lista.map(c => c.id === id ? entity : c);

        return true;
    }

    async findByUserId(userId: number): Promise<Pet[]> {
        return this.lista.filter(c => c.userId === userId);
    }
}