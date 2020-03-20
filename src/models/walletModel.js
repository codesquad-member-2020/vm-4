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
    const walletDB = JSON.parse(localStorage.getItem("walletDB"));
    if (walletDB) {
      this.moneyList = walletDB.moneyList;
      this.total = walletDB.total;
      this.notify(observerType.loadData, { moneyList: this.moneyList, total: this.total });
      return;
    }
    this.fetchData();
  }

  fetchData() {
    const { url, http } = this;
    http.get(url).then(data => {
      this.setDefaultData(data);
      this.updateLocalStorage(data, this.total);
      this.notify(observerType.loadData, { moneyList: this.moneyList, total: this.total });
    });
  }

  setDefaultData(data) {
    let total = 0;
    for (const money in data) {
      total += money * data[money];
    }
    this.total = total;
    this.moneyList = data;
  }

  updateLocalStorage(moneyList, total) {
    const isObject =
      typeof moneyList === "object" && !Array.isArray(moneyList) && moneyList !== null;
    const isNumber = typeof total === "number" && total >= 0;
    try {
      if (isObject && isNumber) {
        localStorage.setItem("walletDB", JSON.stringify({ moneyList, total }));
      } else {
        throw Error("유효한 데이터가 아닙니다.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  updateWhenInputMoney(money) {
    const { moneyList } = this;
    if (moneyList[money] === 0) return;
    moneyList[money] -= 1;
    this.total -= money;
    this.updateLocalStorage(moneyList, this.total);
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
    this.updateLocalStorage(this.moneyList, this.total);
    this.notify(observerType.purchaseItem, { moneyList: this.moneyList, total: this.total });
  }
}
