import { User } from './User';
import { Servico } from './Servico';

export class Pet {
  id: string;
  nome: string;
  raca: string;
  dono: User;
  servicos: Servico[];

  constructor(id: string, nome: string, raca: string, dono: User, servicos: Servico[] = []) {
    this.id = id;
    this.nome = nome;
    this.raca = raca;
    this.dono = dono;
    this.servicos = servicos;
  }
}
