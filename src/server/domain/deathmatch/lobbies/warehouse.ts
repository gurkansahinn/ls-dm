import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import { Deathmatch } from "../deathmatch";
import { DeathmatchLobby } from "../deathmatchLobby";

@injectable()
export class WarehouseLobby implements DeathmatchLobby {
  private readonly deathmatch: Deathmatch;

  public id: string = v4();

  public name: string = 'Warehouse';
  public players: PlayerMp[] = [];

  public positions: Vector3[] = [
    new mp.Vector3(0, 0, 0),
    new mp.Vector3(0, 0, 0),
    new mp.Vector3(0, 0, 0),
    new mp.Vector3(0, 0, 0)
  ];

  public weapons: string[] = [
    'WEAPON_PISTOL',
  ];

  constructor(@inject(Deathmatch) deathmatch: Deathmatch) {
    this.deathmatch = deathmatch;

    this.deathmatch.addLobby(this);
  }

  addPlayer(player: PlayerMp): void {
    this.players.push(player);

    const randomPosition = this.positions[Math.floor(Math.random() * this.positions.length)];
    player.position = randomPosition;
  }

  removePlayer(player: PlayerMp): void {
    const index = this.players.indexOf(player);

    if (index > -1) {
      this.players.splice(index, 1);
    }

    player.position = new mp.Vector3(0, 0, 0);
  }
}