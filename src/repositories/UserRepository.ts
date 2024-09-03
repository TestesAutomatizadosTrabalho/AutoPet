import { IRepository } from "../contracts/IRepository";
import { User } from "../entities/User";

export class UserRepo implements IRepository<User> {
    private lista: User[] = [];

    async getById(id: number): Promise<User> {
        const user = this.lista.find(user => user.id === id);
        if (!user) throw new Error('Usuário não encontrado');
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.lista;
    }

    async save(entity: User): Promise<boolean> {
        this.lista.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const originalLength = this.lista.length;
        this.lista = this.lista.filter(user => user.id !== id);
        return this.lista.length < originalLength;
    }

    async findByName(nome: string): Promise<User[]> {
        return this.lista.filter(user => user.nome === nome);
    }

    async update(id: number, entity: User): Promise<boolean> {
        const index = this.lista.findIndex(user => user.id === id);
        if (index === -1) return false;

        this.lista[index] = entity;
        return true;
    }

    async getByCPF(cpf: string): Promise<User | undefined> {
        return this.lista.find(user => user.cpf === cpf);
    }
}
