import { IRepository } from '../contracts/IRepository';
import { Pet } from '../entities/Pet';

export class AtualizarPetUseCase {
    constructor(private petRepository: IRepository<Pet>) {}

    async execute(id: number, nome: string, raca: string): Promise<boolean> {
        const pet = await this.petRepository.getById(id);
        if (!pet) {
            return false; 
        }

        pet.nome = nome;
        pet.raca = raca;

        return this.petRepository.update(id, pet);
    }
}
