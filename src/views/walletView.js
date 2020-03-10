class WalletView {
  constructor(walletModel, controller) {
    this.walletModel = walletModel;
    this.controller = controller;
  }

  registerAsObserver() {
    this.walletModel.addObserver(this.render);
  }

  render() {
    // 지갑 화면 렌더링
  }

  bindEventListener() {
    // (임의 작성)
    const walletState = document.querySelector(".wallet-state");
    walletState.addEventListener("click", e => this.controller.onClickWalletHandler(e.target));
  }
}
