import { CadastroUsuarioUseCase } from '../../src/usecase_user/cadastrando_usuario';
import { User } from '../../src/entities/User';
import { IRepository } from '../../src/contracts/IRepository';

class UserRepositoryMock implements IRepository<User> {
    private users: User[] = [];

    async getById(id: number): Promise<User> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async save(entity: User): Promise<boolean> {
        this.users.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const originalLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length < originalLength; 
    }

    async update(id: number, entity: User): Promise<boolean> {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return false;
        this.users[index] = entity;
        return true;
    }

    async getByCPF(cpf: string): Promise<User | undefined> {
        return this.users.find(user => user.cpf === cpf);
    }
}

describe('CadastroUsuarioUseCase', () => {
    let userRepository: UserRepositoryMock;
    let cadastroUsuarioUseCase: CadastroUsuarioUseCase;

    beforeEach(() => {
        userRepository = new UserRepositoryMock();
        cadastroUsuarioUseCase = new CadastroUsuarioUseCase(userRepository);
    });

    it('Deve cadastrar um usuário com sucesso', async () => {
        const result = await cadastroUsuarioUseCase.execute(1, '12345678909', 'ddd@gmail.com', 'João', '66754-000');
        expect(result).toBe(true);
        await expect(userRepository.findAll()).resolves.toHaveLength(1);
    });

    it('Deve lançar um erro ao tentar cadastrar um usuário com CPF inválido (menos de 11 dígitos)', async () => {
        await expect(cadastroUsuarioUseCase.execute(1, '123', 'valid@gmail.com', 'João Silva', '66754-000'))
            .rejects
            .toThrow('CPF inválido.');
    });

    it('Deve lançar um erro ao tentar cadastrar um usuário com CPF inválido (não numérico)', async () => {
        await expect(cadastroUsuarioUseCase.execute(1, 'abc.def.ghi-jk', 'valid@gmail.com', 'João Silva', '66754-000'))
            .rejects
            .toThrow('CPF inválido.');
    });

    it('Deve lançar um erro ao tentar cadastrar um usuário com email inválido', async () => {
        await expect(cadastroUsuarioUseCase.execute(1, '12345678909', 'invalid-email', 'João Silva', '66754-000'))
            .rejects
            .toThrow('Email inválido.');
    });

    it('Deve validar corretamente um CPF válido', () => {
        expect(cadastroUsuarioUseCase['isValidCPF']('12345678909')).toBe(true); 
    });

    it('Deve invalidar um CPF inválido', () => {
        expect(cadastroUsuarioUseCase['isValidCPF']('11111111111')).toBe(false); 
    });

    it('Deve validar corretamente um email válido', () => {
        expect(cadastroUsuarioUseCase['isValidEmail']('test@example.com')).toBe(true); 
    });

    it('Deve invalidar um email inválido', () => {
        expect(cadastroUsuarioUseCase['isValidEmail']('test@.com')).toBe(false); 
    });
});
