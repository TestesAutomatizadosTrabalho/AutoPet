import { Pet } from '../../src/entities/Pet';
import { PetController } from '../../src/controller/PetsController';

describe('PetController', () => {
  let controller: PetController;
  let pet1: Pet;
  let pet2: Pet;

  beforeEach(() => {
    controller = new PetController();
    pet1 = { id: 1, nome: 'Fido', raca: 'Labrador', userId: 1 };
    pet2 = { id: 2, nome: 'Bella', raca: 'Beagle', userId: 2 };
  });

  it('deve criar um novo pet', () => {
    const resultado = controller.create(pet1);
    expect(resultado).toEqual(pet1);
    expect(controller.list()).toContainEqual(pet1);
  });

  it('deve obter um pet pelo ID', () => {
    controller.create(pet1);
    const resultado = controller.getById(pet1.id);
    expect(resultado).toEqual(pet1);
  });

  it('deve retornar undefined se o pet não for encontrado pelo ID', () => {
    const resultado = controller.getById(999);
    expect(resultado).toBeUndefined();
  });

  it('deve atualizar um pet existente', () => {
    controller.create(pet1);
    const dadosAtualizados = { nome: 'Rex' };
    const resultado = controller.update(pet1.id, dadosAtualizados);
    expect(resultado).toEqual({ ...pet1, ...dadosAtualizados });
  });

  it('deve retornar undefined ao tentar atualizar um pet inexistente', () => {
    const resultado = controller.update(999, { nome: 'Rex' });
    expect(resultado).toBeUndefined();
  });

  it('deve deletar um pet pelo ID', () => {
    controller.create(pet1);
    const resultado = controller.delete(pet1.id);
    expect(resultado).toBe(true);
    expect(controller.list()).not.toContainEqual(pet1);
  });

  it('deve retornar false ao tentar deletar um pet inexistente', () => {
    const resultado = controller.delete(999);
    expect(resultado).toBe(false);
  });

  it('deve listar todos os pets', () => {
    controller.create(pet1);
    controller.create(pet2);
    const resultado = controller.list();
    expect(resultado).toEqual([pet1, pet2]);
  });

  it('deve obter pets pelo userId', () => {
    controller.create(pet1);
    controller.create(pet2);
    const resultado = controller.getByUserId(pet1.userId);
    expect(resultado).toEqual([pet1]);
  });
});
