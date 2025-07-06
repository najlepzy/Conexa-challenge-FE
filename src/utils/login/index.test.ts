import { isValidLogin } from './index';
import { VALID_USER, VALID_PASS } from '../../screens/Auth/constants';

describe('isValidLogin', () => {
  it('true si user y pass son válidos', () => {
    expect(isValidLogin(VALID_USER, VALID_PASS)).toBe(true);
  });

  it('false si el usuario es incorrecto', () => {
    expect(isValidLogin('usuario_invalido', VALID_PASS)).toBe(false);
  });

  it('false si la contraseña es incorrecta', () => {
    expect(isValidLogin(VALID_USER, 'pass_invalida')).toBe(false);
  });

  it('false si ambos son incorrectos', () => {
    expect(isValidLogin('usuario_invalido', 'pass_invalida')).toBe(false);
  });
});