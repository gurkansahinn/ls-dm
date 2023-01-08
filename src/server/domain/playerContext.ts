import { inject, injectable } from "tsyringe";
import { Account } from "./player/account";
import { PlayerLogin } from "./player/useCases/login/login";
import { PlayerRegister } from "./player/useCases/register/register";

@injectable()
export class PlayerContext {
  private readonly login: PlayerLogin;
  private readonly register: PlayerRegister;

  constructor(@inject(PlayerLogin) login: PlayerLogin, @inject(PlayerRegister) register: PlayerRegister) {
    this.login = login;
    this.register = register;
  }

  async auth(name: string, password: string): Promise<Account> {
    return this.login.auth(name, password);
  }

  async createAccount(name: string, password: string): Promise<Account> {
    return this.register.exec(name, password);
  }
}