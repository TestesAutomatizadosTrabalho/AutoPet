import { PetRepo } from "../../src/repositories/PetRepository";

describe('PetRepo', () => {
    function createSut() {
        const sut = new PetRepo();
        const umPet = { id: 1, nome: 'Pedro', raca: 'Beagle', userId: 3 };
        const segundoPet = { id: 2, nome: 'Vini', raca: 'American Bully', userId: 2 };
        sut.save(umPet);
        sut.save(segundoPet);
        return { sut, umPet, segundoPet };
    }

    it('deve salvar um pet', async () => {
        const { sut } = createSut();
        const novoPet = { id: 3, nome: 'Yann', raca: 'Poodle', userId: 1 };
        const resultado = await sut.save(novoPet);
        expect(resultado).toBe(true);
    });

    it('deve encontrar um pet pelo ID', async () => {
        const { sut, umPet } = createSut();
        const resultado = await sut.getById(umPet.id);
        expect(resultado).toEqual(umPet);
    });

    it('deve lançar um erro se o pet não for encontrado pelo ID', async () => {
        const { sut } = createSut();
        await expect(sut.getById(999)).rejects.toThrow('Usuário não encontrado');
    });

    it('deve retornar todos os pets', async () => {
        const { sut, umPet, segundoPet } = createSut();
        const resultado = await sut.findAll();
        expect(resultado).toEqual([umPet, segundoPet]);
    });

    it('deve deletar um pet pelo ID', async () => {
        const { sut, umPet } = createSut();
        const resultado = await sut.delete(umPet.id);
        expect(resultado).toBe(true);
        const todosPets = await sut.findAll();
        expect(todosPets).not.toContainEqual(umPet);
    });

    it('deve retornar falso ao tentar deletar um pet que não existe', async () => {
        const { sut } = createSut();
        const resultado = await sut.delete(999);
        expect(resultado).toBe(false);
    });

    it('deve encontrar pets pelo nome', async () => {
        const { sut, segundoPet } = createSut();
        const resultado = await sut.findByName(segundoPet.nome);
        expect(resultado).toEqual([segundoPet]);
    });

    it('deve atualizar um pet pelo ID', async () => {
        const { sut, umPet } = createSut();
        const petAtualizado = { id: 1, nome: 'Pedro', raca: 'Beagle', userId: 4 };
        const resultado = await sut.update(umPet.id, petAtualizado);
        expect(resultado).toBe(true);
        const petEncontrado = await sut.getById(umPet.id);
        expect(petEncontrado).toEqual(petAtualizado);
    });

    it('deve retornar falso ao tentar atualizar um pet que não existe', async () => {
        const { sut } = createSut();
        const resultado = await sut.update(999, { id: 999, nome: 'Ghost', raca: 'Mistery', userId: 999 });
        expect(resultado).toBe(false);
    });

    it('deve encontrar pets pelo userId', async () => {
        const { sut, segundoPet } = createSut();
        const resultado = await sut.findByUserId(segundoPet.userId);
        expect(resultado).toEqual([segundoPet]);
    });
});
