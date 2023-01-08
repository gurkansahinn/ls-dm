export class AlreadyCreatedAccountError extends Error {
  constructor() {
    super("Bu kullanıcı adı zaten alınmış.");
  }
}