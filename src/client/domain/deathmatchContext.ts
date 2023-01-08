import { inject, injectable } from "tsyringe";
import { DeathmatchLister, DeathmatchLobby } from "./deathmatch/deathmatchList";

@injectable()
export class DeathmatchContext {
  private readonly deathmatchLister: DeathmatchLister;

  constructor(@inject(DeathmatchLister) deathmatchList: DeathmatchLister) {
    this.deathmatchLister = deathmatchList;
  }

  getDeathmatchList(lobbies: DeathmatchLobby[]): void {
    this.deathmatchLister.show(lobbies);
  }
}