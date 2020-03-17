import Observable from "../util/observable.js";

export default class WalletModel extends Observable {
  constructor(requestUrl, httpRequestModule) {
    super();
    this.url = requestUrl;
    this.http = httpRequestModule;
    this.moneyList = null;
    this.total = 0;
  }

  getInitialData() {
    const { url, http } = this;
    http.get(url).then(data => {
      this.setData(data);
      this.notify("loadData", { moneyList: this.moneyList, total: this.total });
    });
  }

  setData(data) {
    let total = 0;
    for (const money in data) {
      total += money * data[money];
    }
    this.total = total;
    this.moneyList = data;
  }

  updateWhenInputMoney(money) {
    const { moneyList } = this;
    if (moneyList[money] === 0) return;
    moneyList[money] -= 1;
    this.total -= money;
    this.notify("inputMoney", { moneyList: moneyList, total: this.total });
  }

  updateWhenPurchaseItem(price) {
    const amountOfMoney = [10000, 5000, 1000, 500, 100, 50, 10];
    let itemPrice = price;
    function processChanges(money) {
      while (itemPrice >= money) {
        itemPrice -= money;
        this.moneyList[money] += 1;
        this.total += money;
      }
    }
    amountOfMoney.forEach(processChanges.bind(this));
    // this.requestUpdate(this.moneyList);
    this.notify("purchaseItem", { moneyList: this.moneyList, total: this.total });
  }

  requestUpdate(data) {
    const { url, http } = this;
    http.patch(url, data);
  }
}
