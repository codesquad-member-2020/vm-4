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

  updateWallet(money) {
    console.log(money);
  }
}
