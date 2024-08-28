import { Agendamento } from '../../src/entities/Agendamento';
import { AgendamentoController } from '../../src/controller/AgendamentoController';

describe('AgendamentoController', () => {
  let controller: AgendamentoController;
  let agendamento1: Agendamento;
  let agendamento2: Agendamento;

  beforeEach(() => {
    controller = new AgendamentoController();
    agendamento1 = { id: 1, data: new Date(), userId: 1, petId: 1, servicoId: 101 };
    agendamento2 = { id: 2, data: new Date(), userId: 2, petId: 2, servicoId: 102 };
  });

  it('deve criar um novo agendamento', () => {
    const resultado = controller.create(agendamento1);
    expect(resultado).toEqual(agendamento1);
    expect(controller.list()).toContainEqual(agendamento1);
  });

  it('deve obter um agendamento pelo ID', () => {
    controller.create(agendamento1);
    const resultado = controller.getById(agendamento1.id);
    expect(resultado).toEqual(agendamento1);
  });

  it('deve retornar undefined se o agendamento não for encontrado pelo ID', () => {
    const resultado = controller.getById(999);
    expect(resultado).toBeUndefined();
  });

  it('deve atualizar um agendamento existente', () => {
    controller.create(agendamento1);
    const dadosAtualizados = { userId: 3 };
    const resultado = controller.update(agendamento1.id, dadosAtualizados);
    expect(resultado).toEqual({ ...agendamento1, ...dadosAtualizados });
  });

  it('deve retornar undefined ao tentar atualizar um agendamento inexistente', () => {
    const resultado = controller.update(999, { userId: 3 });
    expect(resultado).toBeUndefined();
  });

  it('deve deletar um agendamento pelo ID', () => {
    controller.create(agendamento1);
    const resultado = controller.delete(agendamento1.id);
    expect(resultado).toBe(true);
    expect(controller.list()).not.toContainEqual(agendamento1);
  });

  it('deve retornar false ao tentar deletar um agendamento inexistente', () => {
    const resultado = controller.delete(999);
    expect(resultado).toBe(false);
  });

  it('deve listar todos os agendamentos', () => {
    controller.create(agendamento1);
    controller.create(agendamento2);
    const resultado = controller.list();
    expect(resultado).toEqual([agendamento1, agendamento2]);
  });

  it('deve obter agendamentos pelo userId', () => {
    controller.create(agendamento1);
    controller.create(agendamento2);
    const resultado = controller.getByUserId(agendamento1.userId);
    expect(resultado).toEqual([agendamento1]);
  });

  it('deve obter agendamentos pelo servicoId', () => {
    controller.create(agendamento1);
    controller.create(agendamento2);
    const resultado = controller.getByServicoId(agendamento2.servicoId);
    expect(resultado).toEqual([agendamento2]);
  });

  it('deve obter agendamentos pelo petId', () => {
    controller.create(agendamento1);
    controller.create(agendamento2);
    const resultado = controller.getByPetId(agendamento1.petId);
    expect(resultado).toEqual([agendamento1]);
  });
});
