import Observable from "../../util/observable.js";
import { mockData } from "../../util/constant.js";

export default class VendingMachineModel extends Observable {
  constructor() {
    super();
    this.menu = null;
    this.inputMoney = null;
  }

  getInitialData() {
    this.menu = mockData.items;
    localStorage.setItem("menuDB", JSON.stringify(this.menu));
    this.notify("loadData", this.menu);
  }

  updateWhenInputMoney(inputMoney) {
    this.notify("inputMoney", inputMoney);
  }

  updateInputMoneyMsg(inputMoney) {
    this.notify("inputMoneyMsg", inputMoney);
  }

  setSelectedItem(selectedItem) {
    this.notify("purchaseItem", selectedItem);
  }

  throwError(errorMessage) {
    this.notify("throwError", errorMessage);
  }

  init() {
    const init = "초기화";
    this.notify("completed", init);
  }
}
