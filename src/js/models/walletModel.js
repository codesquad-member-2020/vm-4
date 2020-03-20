import Observable from "../../util/observable.js";
import { observerType, moneyTypeList, mockData } from "../../util/constant.js";

export default class WalletModel extends Observable {
  constructor() {
    super();
    this.moneyList = null;
    this.total = 0;
  }

  getInitialData() {
    this.moneyList = mockData.wallet;
    let total = 0;
    for (const [money, count] of Object.entries(this.moneyList)) {
      total += money * count;
    }
    this.total = total;
    this.updateLocalStorage(this.moneyList, total);
    this.notify(observerType.loadData, { moneyList: this.moneyList, total });
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
    this.notify(observerType.inputMoney, { moneyList, total: this.total });
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