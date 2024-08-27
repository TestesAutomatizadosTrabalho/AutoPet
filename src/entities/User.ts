export class User {
  id: number;
  cpf: string;
  email: string;
  nome: string;
  cep: string;

  constructor(id: number, email: string, nome: string, cep: string) {
    this.id = id;
    this.email = email;
    this.nome = nome;
    this.cep = cep;
  }
}
