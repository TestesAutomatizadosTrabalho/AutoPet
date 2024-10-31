import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetCreateForm from './PetCreateForm';

describe('PetCreateForm Component', () => {
  beforeEach(() => {
    //LImpando o localStorage antes de cada teste
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render form fields and submit button', () => {
    render(<PetCreateForm onPetAdded={jest.fn()} />);

    expect(screen.getByPlaceholderText('E-mail do Dono')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome do Pet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Raça do Pet')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar Pet')).toBeInTheDocument();
  });

  it('should update input values on change', () => {
    render(<PetCreateForm onPetAdded={jest.fn()} />);

    const emailInput = screen.getByPlaceholderText('E-mail do Dono');
    const nameInput = screen.getByPlaceholderText('Nome do Pet');
    const breedInput = screen.getByPlaceholderText('Raça do Pet');

    fireEvent.change(emailInput, { target: { value: 'owner@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Buddy' } });
    fireEvent.change(breedInput, { target: { value: 'Golden Retriever' } });

    expect(emailInput).toHaveValue('owner@example.com');
    expect(nameInput).toHaveValue('Buddy');
    expect(breedInput).toHaveValue('Golden Retriever');
  });

  it('should add pet to localStorage and clear fields on submit', () => {
    const mockOnPetAdded = jest.fn();
    render(<PetCreateForm onPetAdded={mockOnPetAdded} />);

    const emailInput = screen.getByPlaceholderText('E-mail do Dono');
    const nameInput = screen.getByPlaceholderText('Nome do Pet');
    const breedInput = screen.getByPlaceholderText('Raça do Pet');
    const submitButton = screen.getByText('Cadastrar Pet');

    fireEvent.change(emailInput, { target: { value: 'owner@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Buddy' } });
    fireEvent.change(breedInput, { target: { value: 'Golden Retriever' } });

    //SImula a submissão do formulário
    fireEvent.click(submitButton);

    const savedPets = JSON.parse(localStorage.getItem('pets'));

    expect(savedPets).toHaveLength(1);
    expect(savedPets[0]).toMatchObject({
      ownerEmail: 'owner@example.com',
      name: 'Buddy',
      breed: 'Golden Retriever'
    });

    //Verifica se os campos foram limpos após a submissão
    expect(emailInput).toHaveValue('');
    expect(nameInput).toHaveValue('');
    expect(breedInput).toHaveValue('');

    //Verifica se a função onPetAdded foi chamada com os pets atualizados
    expect(mockOnPetAdded).toHaveBeenCalledWith(savedPets);
  });
});
