export class IsPlayerAlreadyConnectedError extends Error {
  constructor() {
    super("Bu kullanıcı adı zaten bağlı.");
  }
}