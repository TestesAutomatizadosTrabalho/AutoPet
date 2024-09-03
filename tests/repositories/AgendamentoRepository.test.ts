import { AgendamentoRepo } from "../../src/repositories/AgendamentoRepository";
import { Agendamento } from "../../src/entities/Agendamento";

describe('AgendamentoRepo', () => {
    function createSut() {
        const sut = new AgendamentoRepo();
        const umAgendamento: Agendamento = { id: 1, data: new Date(), userId: 1, petId: 1, servicoId: 101 };
        const segundoAgendamento: Agendamento = { id: 2, data: new Date(), userId: 2, petId: 2, servicoId: 102 };
        sut.save(umAgendamento);
        sut.save(segundoAgendamento);
        return { sut, umAgendamento, segundoAgendamento };
    }

    it('deve salvar um agendamento', async () => {
        const { sut } = createSut();
        const novoAgendamento: Agendamento = { id: 3, data: new Date(), userId: 3, petId: 3, servicoId: 103 };
        const resultado = await sut.save(novoAgendamento);
        expect(resultado).toBe(true);
    });

    it('deve encontrar um agendamento pelo ID', async () => {
        const { sut, umAgendamento } = createSut();
        const resultado = await sut.getById(umAgendamento.id);
        expect(resultado).toEqual(umAgendamento);
    });

    it('deve lançar um erro se o agendamento não for encontrado pelo ID', async () => {
        const { sut } = createSut();
        await expect(sut.getById(999)).rejects.toThrow('Agendamento não encontrado'); // Ajustado para a mensagem real do erro
    });

    it('deve retornar todos os agendamentos', async () => {
        const { sut, umAgendamento, segundoAgendamento } = createSut();
        const resultado = await sut.findAll();
        expect(resultado).toEqual([umAgendamento, segundoAgendamento]);
    });

    it('deve deletar um agendamento pelo ID', async () => {
        const { sut, umAgendamento } = createSut();
        const resultado = await sut.delete(umAgendamento.id);
        expect(resultado).toBe(true);
        const todosAgendamentos = await sut.findAll();
        expect(todosAgendamentos).not.toContainEqual(umAgendamento);
    });

    it('deve retornar falso ao tentar deletar um agendamento que não existe', async () => {
        const { sut } = createSut();
        const resultado = await sut.delete(999);
        expect(resultado).toBe(false);
    });

    it('deve atualizar um agendamento pelo ID', async () => {
        const { sut, umAgendamento } = createSut();
        const agendamentoAtualizado: Agendamento = { id: 1, data: new Date(), userId: 4, petId: 1, servicoId: 104 };
        const resultado = await sut.update(umAgendamento.id, agendamentoAtualizado);
        expect(resultado).toBe(true);
        const agendamentoEncontrado = await sut.getById(umAgendamento.id);
        expect(agendamentoEncontrado).toEqual(agendamentoAtualizado);
    });

    it('deve retornar falso ao tentar atualizar um agendamento que não existe', async () => {
        const { sut } = createSut();
        const resultado = await sut.update(999, { id: 999, data: new Date(), userId: 999, petId: 999, servicoId: 999 });
        expect(resultado).toBe(false);
    });

    it('deve encontrar agendamentos pelo userId', async () => {
        const { sut, segundoAgendamento } = createSut();
        const resultado = await sut.findByUserId(segundoAgendamento.userId);
        expect(resultado).toEqual([segundoAgendamento]);
    });

    it('deve encontrar agendamentos pelo petId', async () => {
        const { sut, segundoAgendamento } = createSut();
        const resultado = await sut.findByPetId(segundoAgendamento.petId);
        expect(resultado).toEqual([segundoAgendamento]);
    });
});
