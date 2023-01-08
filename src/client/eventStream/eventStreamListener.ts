import { DeathmatchLobby } from "domain/deathmatch/deathmatchList";

export interface EventStreamListener {
  playerShowDeathmatchList(lobbies: DeathmatchLobby[]): void;
}