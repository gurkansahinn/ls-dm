export class InvalidUserError extends Error {
  constructor() {
    super('Geçersiz hesap adı.');
  }
}