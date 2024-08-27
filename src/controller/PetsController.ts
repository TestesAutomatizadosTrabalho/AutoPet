
import { Pet } from'../entities/Pet';
import { IController } from 'contracts/IController';

export class PetController implements IController<Pet> {
  private pets: Pet[] = []; // Simulando um banco de dados com um array

  create(pet: Pet): Pet {
    this.pets.push(pet);
    return pet;
  }

  getById(id: number): Pet | undefined {
    return this.pets.find(pet => pet.id === id);
  }

  update(id: number, updatedPetData: Partial<Pet>): Pet | undefined {
    const pet = this.getById(id);
    if (!pet) {
      return undefined;
    }

    Object.assign(pet, updatedPetData);
    return pet;
  }

  delete(id: number): boolean {
    const index = this.pets.findIndex(pet => pet.id === id);
    if (index !== -1) {
      this.pets.splice(index, 1);
      return true;
    }
    return false;
  }

  list(): Pet[] {
    return this.pets;
  }

  getByUserId(userId: number): Pet[] {
    return this.pets.filter(pet => pet.userId === userId);
  }
}
