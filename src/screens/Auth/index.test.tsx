import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '.';
import { useDispatch } from 'react-redux';
import { showErrorToast } from '@utils/toast';
import { isValidLogin } from '@utils/login';

jest.mock('@utils/login', () => ({
  isValidLogin: jest.fn(),
}));

jest.mock('@utils/toast', () => ({
  showErrorToast: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));


describe('Login', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  it('renderiza inputs y botón', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    expect(getByPlaceholderText('login.emailPlaceholder')).toBeTruthy();
    expect(getByPlaceholderText('login.passwordPlaceholder')).toBeTruthy();
    expect(getByText('login.button')).toBeTruthy();
  });

  it('muestra error si el login no es válido', () => {
    (isValidLogin as jest.Mock).mockReturnValue(false);
    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('login.emailPlaceholder'), 'user');
    fireEvent.changeText(getByPlaceholderText('login.passwordPlaceholder'), 'wrong');
    fireEvent.press(getByText('login.button'));

    expect(showErrorToast).toHaveBeenCalledWith(
      'login.errorTitle',
      'login.errorMessage'
    );
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('dispara login si las credenciales son correctas', () => {
    (isValidLogin as jest.Mock).mockReturnValue(true);
    const { getByPlaceholderText, getByText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('login.emailPlaceholder'), 'admin@test.com');
    fireEvent.changeText(getByPlaceholderText('login.passwordPlaceholder'), '123456');
    fireEvent.press(getByText('login.button'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/login',
      payload: 'admin@test.com',
    });
    expect(showErrorToast).not.toHaveBeenCalled();
  });
});