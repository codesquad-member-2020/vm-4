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
  updateWhenInputMoney(price) {
    this.inputMoney += parseInt(price);
    this.notify("inputMoney", this.inputMoney);
  }
  matchingMenu(price) {
    this.menu.forEach(menu => {
      if (menu.price <= price) return this.selectedMenu.push(menu);
    });
    this.notify("inputMoney", this.selectedMenu);
  }
  setSelectedItem(menuId) {
    let selectedItem = this.menu.find(menu => menu.id == menuId);
    this.inputMoney -= selectedItem.price;
    this.notify("purchaseItem", selectedItem);
  }
}
