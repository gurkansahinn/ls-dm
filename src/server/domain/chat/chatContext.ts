import { inject, injectable } from "tsyringe";
import { AllMessage } from "./useCases/allMessage";

@injectable()
export class ChatContext {
  private readonly allMessage: AllMessage;

  constructor(@inject(AllMessage) allMessage: AllMessage) {
    this.allMessage = allMessage;
  }

  sendAllMessage(player: PlayerMp, message: string) {
    this.allMessage.send(player, message);
  }
}