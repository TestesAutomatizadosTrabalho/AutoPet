
import { PetRepo } from "../../src/repositories/PetRepository";

describe('cliente-repo', () => {
    function createSut(){
        const sut = new PetRepo();
        const teste = 'teste';
        const umPet = {id: 1, nome: 'Pedro', raca: 'Beagle', userId: 3}
        const segundoPet = {id: 2, nome: 'Vini', raca: 'American Bully', userId: 2}
        sut.save(umPet);

        return { sut , teste, umPet, segundoPet};
    }

    it('Salvando um usuário', async() => {
        const { sut } = createSut();
        const resultado = await sut.save({id: 3, nome: 'Yann', raca: 'Poddle', userId: 1});
        expect(resultado).toBe(true);
    });

});