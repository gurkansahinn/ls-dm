import { Logger } from "src/server/logger";
import { inject, injectable } from "tsyringe";
import { validateAccount } from "../../player/account";

@injectable()
export class AllMessage {
  private readonly logger: Logger;

  constructor(@inject(Logger) logger: Logger) {
    this.logger = logger;
  }

  send(player: PlayerMp, message: string) {
    if (!validateAccount(player)) {
      return;
    }

    const chatMessage = `${player.account.name}: ${message}`;

    this.logger.log(chatMessage);
    mp.players.broadcast(chatMessage);
  }
}