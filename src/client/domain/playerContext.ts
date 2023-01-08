import { inject, injectable } from "tsyringe";
import { PlayerLogin } from "./player/login";

@injectable()
export class PlayerContext {
  private readonly login: PlayerLogin;

  constructor(@inject(PlayerLogin) login: PlayerLogin) {
    this.login = login;

    mp.events.add("playerReady", this.showLogin.bind(this));
  }

  async showLogin(): Promise<void> {
    await this.login.show();
  }
}