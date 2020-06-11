export default class Observable {
  constructor() {
    this._observers = { loadData: new Set(), purchaseItem: new Set(), inputMoney: new Set(), inputMoneyMsg: new Set(), completed: new Set(), throwError: new Set() };
  }

  addObserver(type, observer) {
    this._observers[type].add(observer);
  }
  removeObserver(type, observer) {
    this._observers[type] = [...this._observers].filter(subscriber => subscriber !== observer);
  }
  notify(type, data) {
    this._observers[type].forEach(observer => observer(data));
  }
}
