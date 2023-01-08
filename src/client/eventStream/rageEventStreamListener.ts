import { DeathmatchLobby } from "../domain/deathmatch/deathmatchList";
import { DeathmatchContext } from "../domain/deathmatchContext";
import { inject, injectable } from "tsyringe";
import { EventStreamListener } from "./eventStreamListener";
import { PlayerEvents } from "src/shared/playerEvents";

@injectable()
export class RageEventStreamListener implements EventStreamListener {
  private readonly deathmatchContext: DeathmatchContext;

  constructor(@inject(DeathmatchContext) deathmatchContext: DeathmatchContext) {
    this.deathmatchContext = deathmatchContext;

    mp.events.add(PlayerEvents.ShowDeathmatchList, this.playerShowDeathmatchList.bind(this));
  }

  playerShowDeathmatchList(lobbies: DeathmatchLobby[]): void {
    this.deathmatchContext.getDeathmatchList(lobbies);
  }
}