import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from './UserForm';

// Mock para limpar o LocalStorage entre os testes
beforeEach(() => {
  localStorage.clear();
  jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock para alert
});

describe('UserForm Component', () => {
  test('renderiza o formulário corretamente', () => {
    render(<UserForm onUserAdded={() => {}} />);

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  test('preenche os campos de nome e email', () => {
    render(<UserForm onUserAdded={() => {}} />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });

    expect(nameInput.value).toBe('Alice');
    expect(emailInput.value).toBe('alice@example.com');
  });

  test('salva o usuário no LocalStorage ao enviar o formulário', () => {
    const mockOnUserAdded = jest.fn();
    render(<UserForm onUserAdded={mockOnUserAdded} />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });

    fireEvent.change(nameInput, { target: { value: 'Carlos' } });
    fireEvent.change(emailInput, { target: { value: 'carlos@example.com' } });
    fireEvent.click(submitButton);

    // Verifica se os campos foram limpos
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');

    // Verifica se o usuário foi salvo no LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    expect(storedUsers).toEqual([{ name: 'Carlos', email: 'carlos@example.com' }]);

    // Verifica se a função de callback foi chamada com os usuários atualizados
    expect(mockOnUserAdded).toHaveBeenCalledWith(storedUsers);

    // Verifica se o alert foi disparado
    expect(window.alert).toHaveBeenCalledWith('Usuário cadastrado com sucesso!');
  });

  test('adiciona múltiplos usuários ao LocalStorage corretamente', () => {
    render(<UserForm onUserAdded={() => {}} />);

    const nameInput = screen.getByPlaceholderText('Nome');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });

    // Cadastra o primeiro usuário
    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.click(submitButton);

    // Cadastra o segundo usuário
    fireEvent.change(nameInput, { target: { value: 'Bob' } });
    fireEvent.change(emailInput, { target: { value: 'bob@example.com' } });
    fireEvent.click(submitButton);

    // Verifica se ambos os usuários estão no LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    expect(storedUsers).toEqual([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ]);
  });


});
