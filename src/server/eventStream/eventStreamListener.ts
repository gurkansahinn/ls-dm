import { LoginResponse } from "src/shared/eventResponse/loginResponse";
import { RegisterResponse } from "src/shared/eventResponse/registerResponse";

export interface EventStreamListener {
  playerLogin(player: PlayerMp, name: string, password: string): Promise<LoginResponse>;
  playerRegister(player: PlayerMp, name: string, password: string): Promise<RegisterResponse>;

  playerChat(player: PlayerMp, message: string): void;
}