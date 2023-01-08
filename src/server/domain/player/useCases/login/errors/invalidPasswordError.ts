export class InvalidPasswordError extends Error {
  constructor() {
    super('Geçersiz şifre.');
  }
}