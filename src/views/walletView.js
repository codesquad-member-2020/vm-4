import { selectorNames } from "../util/constant.js";
import { wallet } from "../util/template.js";

export default class WalletView {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    this.walletModel.addObserver("onLoad", this.render);
    this.walletModel.addObserver("onInputMoney", this.updateWalletView);
    this.walletModel.addObserver("onPurchase", this.updateWalletView);
  }

  render(data) {
    const vendingMachine = document.getElementById(selectorNames.VM);
    const walletView = wallet`${data}`;
    vendingMachine.insertAdjacentHTML("afterend", walletView);
  }

  updateWalletView(data) {}

  bindOnClickListener(handler) {
    // (임의 작성)
    const walletButtonArea = document.querySelector(".wallet-state");
    walletButtonArea.addEventListener("click", e => {
      // 클릭된 대상이 버튼이 아니면 바로 리턴 (임의 작성)
      if (target !== button) return;
      handler(e.target);
    });
  }
}
