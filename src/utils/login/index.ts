import { VALID_PASS, VALID_USER } from "../../screens/Auth/constants";

export function isValidLogin(user: string, pass: string): boolean {
  return user === VALID_USER && pass === VALID_PASS;
}