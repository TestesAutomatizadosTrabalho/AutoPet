import { Pet } from "entities/Pet";
import { IRepository } from "../contracts/IRepository";

export class PetRepo implements IRepository<Pet> {
    private lista: Pet[] = [];

    async getById(id: number): Promise<Pet> {
        const pet = this.lista.find(pet => pet.id === id);
        if (!pet) throw new Error('Pet não encontrado');
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
        const originalLength = this.lista.length;
        this.lista = this.lista.filter(pet => pet.id !== id);
        return this.lista.length < originalLength;
    }

    async update(id: number, entity: Pet): Promise<boolean> {
        const index = this.lista.findIndex(pet => pet.id === id);
        if (index === -1) return false;

        this.lista[index] = entity;
        return true;
    }
    async findByName(nome: string): Promise<Pet[]> {
        return this.lista.filter(pet => pet.nome === nome);
    }

    async findByUserId(userId: number): Promise<Pet[]> {
        return this.lista.filter(pet => pet.userId === userId);
    }

    async getByCPF(cpf: string): Promise<Pet | undefined> {
        return undefined;
    }
}
