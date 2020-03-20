import Observable from "../../util/observable.js";

export default class VendingMachineModel extends Observable {
  constructor(requestUrl, httpRequestModule) {
    super();
    this.url = requestUrl;
    this.http = httpRequestModule;
    this.menu = null;
    this.inputMoney = null;
  }

  getInitialData() {
    return new Promise(res => {
      res(
        this.http.get(this.url).then(data => {
          this.menu = data;
          localStorage.setItem("menuDB", JSON.stringify(this.menu));
          this.notify("loadData", this.menu);
        })
      );
    });
  }

  updateWhenInputMoney(inputMoney) {
    this.notify("inputMoney", inputMoney);
  }

  updateInputMoneyMsg(inputMoney){
    this.notify("inputMoneyMsg", inputMoney);
  }

  setSelectedItem(selectedItem) {
    this.notify("purchaseItem", selectedItem);
  }

  throwError(errorMessage) {
    this.notify("throwError", errorMessage);
  }

  init(){
    const init = '초기화';
    this.notify("completed", init);
  }
}