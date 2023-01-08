export interface BaseDeathmatchLobby {
  id: string;
  name: string;
}

export interface DeathmatchLobby extends BaseDeathmatchLobby {
  id: string;

  name: string;
  players: PlayerMp[];

  positions: Vector3[];
  weapons: string[];

  addPlayer(player: PlayerMp): void;
  removePlayer(player: PlayerMp): void;
}
