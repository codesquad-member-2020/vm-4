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
    // 지갑 화면 렌더링
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
