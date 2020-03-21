import Observable from "../../util/observable.js";
import { observerType, mockData } from "../../util/constant.js";

export default class VendingMachineModel extends Observable {
  constructor() {
    super();
    this.menu = null;
    this.inputMoney = null;
  }

  getInitialData() {
    this.menu = mockData.menu;
    localStorage.setItem("menuDB", JSON.stringify(this.menu));
    this.notify(observerType.loadData, this.menu);
  }

  updateWhenInputMoney(inputMoney) {
    this.notify(observerType.inputMoney, inputMoney);
  }

  updateInputMoneyMsg(inputMoney) {
    this.notify(observerType.inputMoneyMsg, inputMoney);
  }

  setSelectedItem(selectedItem) {
    this.notify(observerType.purchaseItem, selectedItem);
  }

  throwError(errorMessage) {
    this.notify(observerType.throwError, errorMessage);
  }

  init() {
    const init = "초기화";
    this.notify(observerType.completed, init);
  }
}
