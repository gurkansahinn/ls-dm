import { injectable } from "tsyringe";
import { DeathmatchLobby } from "./deathmatchLobby";

@injectable()
export class Deathmatch {
  private readonly lobbies: DeathmatchLobby[];

  constructor() {
    this.lobbies = [];
  }

  addLobby(lobby: DeathmatchLobby) {
    this.lobbies.push(lobby);
  }

  getLobbies(): DeathmatchLobby[] {
    return this.lobbies;
  }
}