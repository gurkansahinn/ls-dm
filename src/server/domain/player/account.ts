export interface Account {
  id: string;
  name: string;
  password: string;
}

export function validateAccount(player: PlayerMp): boolean {
  return player.account !== undefined;
}