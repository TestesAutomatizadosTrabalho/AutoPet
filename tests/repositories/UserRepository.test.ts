
import { UserRepo } from "../../src/repositories/UserRepository";

describe('cliente-repo', () => {
    function createSut(){
        const sut = new UserRepo();
        const teste = 'teste';
        const umUser = {id: 1, cpf: '123', email: 'dafeaeeee@gmail.com', nome: 'Jonny', cep: '123'}
        const segundoUser = {id: 2, cpf: '231', email: 'dd@gmail.com', nome: 'Alalala', cep: '32222'}
        sut.save(umUser);

        return { sut , teste, umUser, segundoUser};
    }

    it('Salvando um usuário', async() => {
        const { sut } = createSut();
        const resultado = await sut.save({id: 3, cpf: '1233', email: 'Guy@gmail.com', nome: 'Yann', cep: '321'});
        expect(resultado).toBe(true);
    });

    it('Should be defined', () => {
        const { sut } = createSut();
        expect(sut).toBeDefined();
    });

    it('Teste buscar id inexistente 100', async() => {
        const { sut } = createSut();
        await expect(sut.getById(100)).rejects.toThrow();
    });

    it('Teste buscar id existente', async() => {
        const { sut } = createSut();
        const resultado = await sut.getById(1);
        expect(resultado).toBeTruthy();
    });

    it('Consegui listar todos os usuários', async () => {
        const { sut, umUser } = createSut();
        const resultado = await sut.findAll();
        expect(resultado).toEqual([umUser]);
    });

    it('Usuário deletado', async() => {
        const { sut } = createSut();
        const resultado = await sut.delete(1);
        expect(resultado).toBe(true);
    });

    it('Usuário não deletado', async() => {
        const { sut } = createSut();
        const resultado = await sut.delete(10000000);
        expect(resultado).toBe(false);
    });

    it('Achando pelo nome', async() => {
        const { sut, umUser } = createSut();
        const resultado = await sut.findByName(umUser.nome);
        expect(resultado).toEqual([umUser]);
    });

    it('Atualizado com sucesso', async() => {
        const { sut, segundoUser } = createSut();
        sut.save(segundoUser);
        const clienteAtualizado = {id: 1, cpf: '2222', email: 'EEE@gmail.com', nome: 'JonnyBeer', cep: '1234'}
        const resultado = await sut.update(1, clienteAtualizado);
        expect(resultado).toBe(true);
    });

    it('Usuário não encontrado para atualizar', async() => {
        const { sut, segundoUser } = createSut();
        sut.save(segundoUser);
        const clienteAtualizado = {id: 100, cpf: '333333', email: 'EEE@gmail.com', nome: 'Lusgas', cep: '1234'}
        const resultado = await sut.update(10, clienteAtualizado);
        expect(resultado).toBe(false);
    });

});