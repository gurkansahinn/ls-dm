import { injectable } from "tsyringe";

export interface DialogResponse {
  dialogName: string;
  clickedButtonId: number;
  selectedItemId: number;
  inputValue: string;
  passwordValue: string;
}

@injectable()
export class Dialog {
  private htmlWindow: BrowserMp;

  constructor() {
    this.htmlWindow = mp.browsers.new("package://cef/dialog/index.html");
  }

  show(dialogName: string,
    dialogCaption: string,
    dialogInfo: string,
    dialogButtons: string[],
    dialogListItems?: string[],
    dialogInput?: string,
    dialogPasswordInput?: string) {
    const buttons: string = "[" + dialogButtons.map((button) => `"${button}"`).join(",") + "]";
    const listItems: string = dialogListItems ? "[" + dialogListItems.map((item) => `"${item}"`).join(",") + "]" : "[]";

    this.htmlWindow.execute(`createDialog('${dialogName}', '${dialogCaption}', '${dialogInfo}', ${buttons}, ${listItems}, '${dialogInput}', '${dialogPasswordInput}');`);

    setTimeout(() => mp.gui.cursor.show(true, true), 100);
  }

  destroy() {
    if (this.htmlWindow) {
      this.htmlWindow.destroy();
    }
  }
}