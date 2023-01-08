import { EventStreamEmitter } from "src/server/eventStream/eventStreamEmitter";
import { ServiceIdentify } from "src/server/serviceIdentify";
import { inject, injectable } from "tsyringe";
import { Deathmatch } from "./deathmatch";

@injectable()
export class DeathmatchCommand {
  private readonly deathmatch: Deathmatch;
  private readonly eventStreamEmitter: EventStreamEmitter;

  constructor(@inject(Deathmatch) deathmatch: Deathmatch, @inject(ServiceIdentify.EventStreamEmitter) eventStreamEmitter: EventStreamEmitter) {
    this.deathmatch = deathmatch;
    this.eventStreamEmitter = eventStreamEmitter;

    mp.events.addCommand('dm', this.deathmatchCommand.bind(this));
  }


  private async deathmatchCommand(player: PlayerMp): Promise<void> {
    const lobbies = this.deathmatch.getLobbies();
    this.eventStreamEmitter.playerShowDeathmatchList(player, lobbies);
  }
}