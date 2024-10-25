import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';

test('renderiza o formulário de usuário e envia dados', () => {
  render(<UserForm />);
  const inputNome = screen.getByPlaceholderText(/Nome/i);
  const inputEmail = screen.getByPlaceholderText(/Email/i);
  const button = screen.getByText(/Cadastrar/i);

  fireEvent.change(inputNome, { target: { value: 'John Doe' } });
  fireEvent.change(inputEmail, { target: { value: 'john@example.com' } });
  fireEvent.click(button);

  expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
});
