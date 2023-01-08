import { BaseDeathmatchLobby } from "../domain/deathmatch/deathmatchLobby";

export interface EventStreamEmitter {
  playerShowDeathmatchList(player: PlayerMp, lobbies: BaseDeathmatchLobby[]): void;
}