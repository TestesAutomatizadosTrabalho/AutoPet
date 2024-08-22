import { Pet } from './Pet';

export class User {
  id: number;
  email: string;
  nome: string;
  cep: string;
  pets: Pet[];

  constructor(id: number, email: string, nome: string, cep: string, pets: Pet[] = []) {
    this.id = id;
    this.email = email;
    this.nome = nome;
    this.cep = cep;
    this.pets = pets;
  }
}
