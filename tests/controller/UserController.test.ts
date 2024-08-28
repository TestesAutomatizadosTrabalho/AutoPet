import { UserController } from '../../src/controller/UserController';
import { User } from '../../src/entities/User';

describe('UserController', () => {
  let controller: UserController;
  let user1: User;
  let user2: User;

  beforeEach(() => {
    controller = new UserController();
    user1 = new User(1, '122222', 'lusgas@gmail.com', 'Lusgas', '1234');
    user2 = new User(2, '987', 'yann@gmail.com', 'Yann', '876');
  });

  it('deve criar um novo usuário', () => {
    const resultado = controller.create(user1);
    expect(resultado).toEqual(user1);
    expect(controller.list()).toContainEqual(user1);
  });

  it('deve obter um usuário pelo ID', () => {
    controller.create(user1);
    const resultado = controller.getById(user1.id);
    expect(resultado).toEqual(user1);
  });

  it('deve retornar undefined se o usuário não for encontrado pelo ID', () => {
    const resultado = controller.getById(999);
    expect(resultado).toBeUndefined();
  });

  it('deve atualizar um usuário existente', () => {
    controller.create(user1);
    const dadosAtualizados = { nome: 'Yannnn', cep: '543' };
    const resultado = controller.update(user1.id, dadosAtualizados);
    expect(resultado).toEqual({ ...user1, ...dadosAtualizados });
  });

  it('deve retornar undefined ao tentar atualizar um usuário inexistente', () => {
    const resultado = controller.update(999, { nome: 'Yann' });
    expect(resultado).toBeUndefined();
  });

  it('deve deletar um usuário pelo ID', () => {
    controller.create(user1);
    const resultado = controller.delete(user1.id);
    expect(resultado).toBe(true);
    expect(controller.list()).not.toContainEqual(user1);
  });

  it('deve retornar false ao tentar deletar um usuário inexistente', () => {
    const resultado = controller.delete(999);
    expect(resultado).toBe(false);
  });

  it('deve listar todos os usuários', () => {
    controller.create(user1);
    controller.create(user2);
    const resultado = controller.list();
    expect(resultado).toEqual([user1, user2]);
  });
});
