import { selectorNames, observerType } from "../../util/constant.js";
import { $select, $selectAll, $getById } from "../../util/utilFunc.js";
import { wallet } from "./template.js";

export default class WalletView {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    this.walletModel.addObserver(observerType.loadData, this.render);
    this.walletModel.addObserver(observerType.inputMoney, this.updateWalletView.bind(this));
    this.walletModel.addObserver(observerType.purchaseItem, this.updateWalletView.bind(this));
  }

  render(data) {
    const vendingMachine = $getById(selectorNames.VM);
    const walletView = wallet`${data}`;
    vendingMachine.insertAdjacentHTML("afterend", walletView);
  }

  updateWalletView(data) {
    const { moneyList, total } = data;
    const listNode = $selectAll(`.${selectorNames.WALLET_COUNT}`);
    listNode.forEach(list => {
      const [button, span] = list.children;
      const money = button.getAttribute("value");
      span.textContent = moneyList[money];
    });
    this.addComma(total);
  }

  addComma(total) {
    let totalWithComma = "";
    let totalString = total + "";
    for (let i = totalString.length; i > 0; i -= 3) {
      i - 3 > 0
        ? (totalWithComma = `,${totalString.slice(i - 3, i)}` + totalWithComma)
        : (totalWithComma = `${totalString.slice(0, i)}` + totalWithComma);
    }
    const totalNode = $select(`.${selectorNames.WALLET_TOTAL}`);
    totalNode.firstElementChild.textContent = totalWithComma;
  }

  bindOnClickListener(handler) {
    const app = $getById(selectorNames.APP);
    app.addEventListener("click", e => {
      const target = e.target;
      const targetNode = target.nodeName;
      const parentClassName = target.parentNode.className;
      if (targetNode === "BUTTON" && parentClassName === selectorNames.WALLET_COUNT) {
        handler(target.value);
      }
    });
  }
}
