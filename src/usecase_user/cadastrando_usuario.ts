import { IRepository } from '../contracts/IRepository';
import { User } from '../entities/User';

export class CadastroUsuarioUseCase {
    constructor(private userRepository: IRepository<User>) {}

    async execute(id: number, cpf: string, email: string, nome: string, cep: string): Promise<boolean> {
        if (!this.isValidEmail(email)) {
            throw new Error('Email inválido.');
        }

        if (!this.isValidCPF(cpf)) {
            throw new Error('CPF inválido.');
        }

        const user = await this.userRepository.getByCPF(cpf);
        if (user) {
          return false; 
        }
        
        const userNovo = new User(id, cpf, email, nome, cep);
        return this.userRepository.save(userNovo);
    }

    private isValidCPF(cpf: string): boolean {
        if (typeof cpf !== 'string' || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
            return false;
        }

        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
    
        return true;
    }    

    private isValidEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}
