import { AtualizarPetUseCase } from '../../src/usecase_pets/atualizando_pet';
import { Pet } from '../../src/entities/Pet';
import { IRepository } from '../../src/contracts/IRepository';

class PetRepositoryMock implements IRepository<Pet> {
    private pets: Pet[] = [];

    async getById(id: number): Promise<Pet> {
        const pet = this.pets.find(pet => pet.id === id);
        if (!pet) {
            throw new Error('Pet não encontrado'); 
        }
        return pet;
    }

    async findAll(): Promise<Pet[]> {
        return this.pets;
    }

    async save(entity: Pet): Promise<boolean> {
        this.pets.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const originalLength = this.pets.length;
        this.pets = this.pets.filter(pet => pet.id !== id);
        return this.pets.length < originalLength; 
    }

    async update(id: number, entity: Pet): Promise<boolean> {
        const index = this.pets.findIndex(pet => pet.id === id);
        if (index === -1) return false;
        this.pets[index] = entity;
        return true;
    }

    async getByCPF(cpf: string): Promise<Pet | undefined> {
        return undefined;
    }
}

// Testes
describe('AtualizarPetUseCase', () => {
    let petRepository: PetRepositoryMock;
    let atualizarPetUseCase: AtualizarPetUseCase;

    beforeEach(() => {
        petRepository = new PetRepositoryMock();
        atualizarPetUseCase = new AtualizarPetUseCase(petRepository);
    });

    it('Deve lançar um erro ao tentar atualizar um pet que não existe', async () => {
        await expect(atualizarPetUseCase.execute(999, 'Max', 'Golden Retriever'))
            .rejects.toThrow('Pet não encontrado'); // Ajustado para esperar erro
    });

    it('Deve atualizar um pet existente com sucesso', async () => {
        const pet = new Pet();
        pet.id = 1;
        pet.nome = 'Buddy';
        pet.raca = 'Labrador';
        pet.userId = 123;

        await petRepository.save(pet);

        const result = await atualizarPetUseCase.execute(1, 'Max', 'Golden Retriever');
        expect(result).toBe(true);

        const updatedPet = await petRepository.getById(1);
        expect(updatedPet.nome).toBe('Max');
        expect(updatedPet.raca).toBe('Golden Retriever');
    });
});
