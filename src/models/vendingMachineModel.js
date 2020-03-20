import Observable from "../util/observable.js";

export default class VendingMachineModel extends Observable {
  constructor(requestUrl, httpRequestModule) {
    super();
    this.url = requestUrl;
    this.http = httpRequestModule;
    this.menu = null;
    this.inputMoney = null;
    this.selectedMenu = [];
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
    this.inputMoney += parseInt(inputMoney);
    this.notify("inputMoney", this.inputMoney);
  }
  setSelectedItem(menuId) {
    let selectedItem = this.menu.find(menu => menu.id == menuId);
    this.inputMoney -= selectedItem.price;
    this.notify("purchaseItem", selectedItem);
  }
  // getBackMoney() {
  //   this.notify("purchaseItem", this.inputMoney);
  // }
}
