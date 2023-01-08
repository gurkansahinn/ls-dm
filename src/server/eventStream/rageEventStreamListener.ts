import { LoginResponse } from "src/shared/eventResponse/loginResponse";
import { RegisterResponse } from "src/shared/eventResponse/registerResponse";
import { PlayerEvents } from "src/shared/playerEvents";
import { inject, injectable } from "tsyringe";
import { PlayerContext } from "../domain/playerContext";
import { EventStreamListener } from "./eventStreamListener";
import crypto from "crypto";
import { ChatContext } from "../domain/chat/chatContext";

@injectable()
export class RageEventStreamListener implements EventStreamListener {
  private readonly playerContext: PlayerContext;
  private readonly chatContext: ChatContext;

  constructor(@inject(PlayerContext) playerContext: PlayerContext, @inject(ChatContext) chatContext: ChatContext) {
    this.playerContext = playerContext;
    this.chatContext = chatContext;

    mp.events.addProc(PlayerEvents.Login, this.playerLogin.bind(this));
    mp.events.addProc(PlayerEvents.Register, this.playerRegister.bind(this));

    mp.events.add(PlayerEvents.Chat, this.playerChat.bind(this));
  }

  async playerLogin(player: PlayerMp, name: string, password: string): Promise<LoginResponse> {
    try {
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      const account = await this.playerContext.auth(name, hashedPassword);
      player.account = account;

      return { success: true, message: "Giriş başarılı." }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return { success: false, message: "Bilinmeyen bir hata oluştu." };
    }
  }

  async playerRegister(player: PlayerMp, name: string, password: string): Promise<RegisterResponse> {
    try {
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      const account = await this.playerContext.createAccount(name, hashedPassword);
      player.account = account;

      return { success: true, message: "Kayıt başarılı." }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return { success: false, message: "Bilinmeyen bir hata oluştu." };
    }
  }

  playerChat(player: PlayerMp, message: string): void {
    this.chatContext.sendAllMessage(player, message);
  }
}