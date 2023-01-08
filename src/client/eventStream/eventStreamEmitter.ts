import { LoginResponse } from "@shared/eventResponse/loginResponse";
import { RegisterResponse } from "@shared/eventResponse/registerResponse";

export interface EventStreamEmitter {
  playerLogin(name: string, password: string): Promise<LoginResponse>;
  playerRegister(name: string, password: string): Promise<RegisterResponse>;

  playerDeathmatchJoin(lobbyId: string): void;
}