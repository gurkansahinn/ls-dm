import { PlayerEvents } from "src/shared/playerEvents";
import { injectable } from "tsyringe";
import { BaseDeathmatchLobby } from "../domain/deathmatch/deathmatchLobby";
import { EventStreamEmitter } from "./eventStreamEmitter";

@injectable()
export class RageEventStreamEmitter implements EventStreamEmitter {
  playerShowDeathmatchList(player: PlayerMp, lobbies: BaseDeathmatchLobby[]): void {
    const baseLobbies: BaseDeathmatchLobby[] = lobbies.map((lobby) => {
      return {
        id: lobby.id,
        name: lobby.name,
      };
    });

    player.call(PlayerEvents.ShowDeathmatchList, [baseLobbies]);
  }
}