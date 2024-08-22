import { log } from "console";
import { UserRepo } from "../../src/repositories/UserRepository";

describe('cliente-repo', () => {
    function createSut(){
        const sut = new UserRepo();
        const teste = 'teste';
        const umUser = {id: 1, nome: 'Jonny', email: 'dafeaeeee@gmail.com', cep: '123', pets: []}
        const segundoUser = {id: 2, nome: 'Alalala', email: 'dd@gmail.com', cep: '32222', pets: []}
        sut.save(umUser);

        return { sut , teste, umUser, segundoUser};
    }

    it('Salvando um usuário', async() => {
        const { sut } = createSut();
        const resultado = await sut.save({id: 3, nome: 'Yann', email: 'Guy@gmail.com', cep: '321', pets: []});
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
        const clienteAtualizado = {id: 1, nome: 'JonnyBeer', email: 'EEE@gmail.com', cep: '1234', pets: []}
        const resultado = await sut.update(1, clienteAtualizado);
        expect(resultado).toBe(true);
    });

    it('Usuário não encontrado para atualizar', async() => {
        const { sut, segundoUser } = createSut();
        sut.save(segundoUser);
        const clienteAtualizado = {id: 10, nome: 'Lusgas', email: 'EEE@gmail.com', cep: '1234', pets: []}
        const resultado = await sut.update(10, clienteAtualizado);
        expect(resultado).toBe(false);
    });

});