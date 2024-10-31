import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from './Users';

//Limpa o LocalStorage antes de cada teste
beforeEach(() => {
  localStorage.clear();
});

describe('Users Component', () => {
  test('renderiza corretamente com nenhum usuário cadastrado', () => {
    render(<Users />);
    expect(screen.getByText('Cadastrar Usuário')).toBeInTheDocument();
    expect(screen.getByText('Usuários Cadastrados:')).toBeInTheDocument();
    expect(screen.getByText('Nenhum usuário cadastrado.')).toBeInTheDocument();
  });

  test('exibe usuários armazenados no LocalStorage', async () => {
    const mockUsers = [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ];
    localStorage.setItem('users', JSON.stringify(mockUsers));

    render(<Users />);

    //Usar uma função como matcher para localizar o texto
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Alice'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('alice@example.com'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Bob'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('bob@example.com'))).toBeInTheDocument();
    });
  });

  test('cadastra um novo usuário corretamente', async () => {
    render(<Users />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });

    //Preenche e envia o formulário
    fireEvent.change(nameInput, { target: { value: 'Carlos' } });
    fireEvent.change(emailInput, { target: { value: 'carlos@example.com' } });
    fireEvent.click(submitButton);

    //Aguarda a renderização do novo usuário
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Carlos'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('carlos@example.com'))).toBeInTheDocument();
    });

    //Verifica se o usuário foi salvo no LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    expect(storedUsers).toEqual([{ name: 'Carlos', email: 'carlos@example.com' }]);
  });

  test('atualiza a lista de usuários após cadastro', async () => {
    render(<Users />);

    expect(screen.getByText('Nenhum usuário cadastrado.')).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });

    //Cadastra um novo usuário
    fireEvent.change(nameInput, { target: { value: 'Carlos' } });
    fireEvent.change(emailInput, { target: { value: 'carlos@example.com' } });
    fireEvent.click(submitButton);

    //Aguarda a lista ser atualizada
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Carlos'))).toBeInTheDocument();
    });
  });
});
