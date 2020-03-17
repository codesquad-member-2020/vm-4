import { selectorNames } from "../util/constant.js";
import { wallet } from "./template.js";

export default class WalletView {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    this.walletModel.addObserver("loadData", this.render);
    this.walletModel.addObserver("inputMoney", this.updateWalletView);
    this.walletModel.addObserver("purchaseItem", this.updateWalletView);
  }

  render(data) {
    const vendingMachine = document.getElementById(selectorNames.VM);
    const walletView = wallet`${data}`;
    vendingMachine.insertAdjacentHTML("afterend", walletView);
  }

  updateWalletView(data) {}

  bindOnClickListener(handler) {
    const app = document.getElementById("app");
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
