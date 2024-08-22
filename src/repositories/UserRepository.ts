import { IRepository } from "../contracts/IRepository";
import { User } from "../entities/User";


export class UserRepo implements IRepository<User> {
    private lista: User[] = [];

    async getById(id: number): Promise<User> {
        const user = this.lista.find(c => c.id === id);
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
        const result = this.lista.filter(c => c.id !== id);
        if (result.length === this.lista.length) return false;
        return true;
    }
    
    async findByName(nome: string): Promise<User[]> {
        return this.lista.filter(c => c.nome === nome);
    }

    async update(id: number, entity: User): Promise<boolean> {
        if(!this.lista.find(c => c.id === id)) return false;

        this.lista = this.lista.map(c => c.id === id ? entity : c);

        return true;
    }
}