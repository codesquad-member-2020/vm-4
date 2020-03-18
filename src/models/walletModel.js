import Observable from "../util/observable.js";
import { observerType, moneyTypeList } from "../util/constant.js";

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
      this.notify(observerType.loadData, { moneyList: this.moneyList, total: this.total });
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
    this.notify(observerType.inputMoney, { moneyList: moneyList, total: this.total });
  }

  updateWhenPurchaseItem(changes) {
    let theChanges = changes;
    function processChanges(money) {
      while (theChanges >= money) {
        theChanges -= money;
        this.moneyList[money] += 1;
        this.total += money;
      }
    }
    moneyTypeList.forEach(processChanges.bind(this));
    // this.requestUpdate(this.moneyList);
    this.notify(observerType.purchaseItem, { moneyList: this.moneyList, total: this.total });
  }

  requestUpdate(data) {
    const { url, http } = this;
    http.patch(url, data);
  }
}
