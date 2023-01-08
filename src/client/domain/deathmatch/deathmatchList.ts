import { Dialog, DialogResponse } from "../../dialog/dialog";
import { EventStreamEmitter } from "../../eventStream/eventStreamEmitter";
import { inject, injectable } from "tsyringe";
import { ServiceIdentify } from "../../serviceIdentify";

export interface DeathmatchLobby {
  id: string;
  name: string;
}

@injectable()
export class DeathmatchLister {
  private readonly dialog: Dialog;
  private readonly eventEmitter: EventStreamEmitter;

  private readonly dialogName: string = "DeathmatchList";
  private lobbies: DeathmatchLobby[] = [];

  constructor(@inject(Dialog) dialog: Dialog, @inject(ServiceIdentify.EventStreamEmitter) eventEmitter: EventStreamEmitter) {
    this.dialog = dialog;
    this.eventEmitter = eventEmitter;

    mp.events.add(this.dialogName, this.onEvent.bind(this));
  }

  show(lobbies: DeathmatchLobby[]): void {
    this.lobbies = lobbies;

    const list = this.lobbies.map((lobby) => lobby.name);
    this.dialog.show(this.dialogName, 'Lobi Seçimi', "Katılmak istediğin deathmatch lobisini seçebilirsin.", ["Seç"], list, "", "");
  }

  private onEvent(...data: string[]): void {
    const { selectedItemId }: DialogResponse = JSON.parse(data[0]);

    const selectedLobby = this.lobbies[selectedItemId];
    if (!selectedLobby) {
      return;
    }

    this.eventEmitter.playerDeathmatchJoin(selectedLobby.id);
  }
}