import { PlayerEvents } from "@shared/playerEvents";
import { EventStreamEmitter } from "./eventStreamEmitter";
import { injectable } from 'tsyringe';
import { LoginResponse } from "@shared/eventResponse/loginResponse";
import { RegisterResponse } from "@shared/eventResponse/registerResponse";

@injectable()
export class RageEventStreamEmitter implements EventStreamEmitter {
  playerLogin(name: string, password: string): Promise<LoginResponse> {
    return mp.events.callRemoteProc(PlayerEvents.Login, name, password);
  }

  playerRegister(name: string, password: string): Promise<RegisterResponse> {
    return mp.events.callRemoteProc(PlayerEvents.Register, name, password);
  }
}