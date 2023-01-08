import { EventStreamEmitter } from "./eventStreamEmitter";
import { injectable } from 'tsyringe';
import { PlayerEvents } from "src/shared/playerEvents";
import { LoginResponse } from "src/shared/eventResponse/loginResponse";
import { RegisterResponse } from "src/shared/eventResponse/registerResponse";

@injectable()
export class RageEventStreamEmitter implements EventStreamEmitter {
  playerLogin(name: string, password: string): Promise<LoginResponse> {
    return mp.events.callRemoteProc(PlayerEvents.Login, name, password);
  }

  playerRegister(name: string, password: string): Promise<RegisterResponse> {
    return mp.events.callRemoteProc(PlayerEvents.Register, name, password);
  }

  playerDeathmatchJoin(lobbyId: string): void {
    mp.events.callRemote(PlayerEvents.DeathmatchJoin, lobbyId);
  }
}