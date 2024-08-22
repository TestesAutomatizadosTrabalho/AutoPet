import { Pet } from './Pet';

export class Servico {
  id: string;
  tipo: string;
  data: Date;
  pet: Pet;

  constructor(id: string, tipo: string, data: Date, pet: Pet) {
    this.id = id;
    this.tipo = tipo;
    this.data = data;
    this.pet = pet;
  }
}
