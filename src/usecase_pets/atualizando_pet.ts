import { IRepository } from '../contracts/IRepository';
import { Pet } from '../entities/Pet';

export class AtualizarPetUseCase {
    constructor(private petRepository: IRepository<Pet>) {}

    async execute(id: number, nome: string, raca: string): Promise<boolean | Error> {
        const pet = await this.petRepository.getById(id);
        if (!pet) {
            return new Error("Regra de negócio quebrada"); 
        }

        pet.nome = nome;
        pet.raca = raca;

        return this.petRepository.update(id, pet);
    }
}
