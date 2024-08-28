export class User {
  id: number;
  cpf: string;
  email: string;
  nome: string;
  cep: string;

  constructor(id: number, cpf: string, email: string, nome: string, cep: string) {
    this.id = id;
    this.cpf = cpf;
    this.email = email;
    this.nome = nome;
    this.cep = cep;
  }
}
