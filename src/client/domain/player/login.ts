import { EventStreamEmitter } from "../../eventStream/eventStreamEmitter";
import { ServiceIdentify } from "../../serviceIdentify";
import { inject, injectable } from "tsyringe";
import { Dialog, DialogResponse } from "../../dialog/dialog";

@injectable()
export class PlayerLogin {
  private readonly dialog: Dialog;
  private readonly eventEmitter: EventStreamEmitter;
  private readonly camera: CameraMp;

  private readonly dialogName: string = "LoginDialog";

  constructor(@inject(Dialog) dialog: Dialog, @inject(ServiceIdentify.EventStreamEmitter) eventEmitter: EventStreamEmitter) {
    this.dialog = dialog;
    this.eventEmitter = eventEmitter;

    mp.game.clock.pauseClock(true);
    mp.game.graphics.transitionToBlurred(1000);
    mp.game.hud.displayRadar(false);
    this.camera = mp.cameras.new(this.dialogName, new mp.Vector3(-64.17094421386719, -824.6749877929688, 300.018310546875), new mp.Vector3(0, 0, 0), 60);
    this.camera.pointAtCoord(0, 400, 50);
    this.camera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false, 0);
  }

  async show(): Promise<void> {
    mp.gui.chat.activate(false);
    this.dialog.show(this.dialogName, "Giriş Yap", "Lütfen giriş veya kayıt olmak için bilgilerinizi giriniz.", ["Giriş Yap", "Kayıt Ol"], [], ["Kullanıcı Adı"], "Şifre");

    mp.events.add(this.dialogName, this.onEvent.bind(this));
  }

  async onEvent(...data: string[]): Promise<void> {
    const { inputValue: name, passwordValue: password, clickedButtonId }: DialogResponse = JSON.parse(data[0]);

    if (!clickedButtonId) {
      const response = await this.eventEmitter.playerLogin(name, password);

      if (!response.success) {
        this.notificaton(response.message);
        return;
      }

      this.finish();
      return;
    }

    const response = await this.eventEmitter.playerRegister(name, password);

    if (!response.success) {
      this.notificaton(response.message);
      return;
    }

    this.finish();
  }

  notificaton(message: string): void {
    mp.gui.chat.push(message);
  }

  finish(): void {
    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);

    this.camera.destroy();
    this.dialog.destroy();

    mp.game.cam.renderScriptCams(false, false, 0, false, false, 0);
    mp.game.hud.displayRadar(true);
    mp.game.graphics.transitionFromBlurred(1);
  }
}