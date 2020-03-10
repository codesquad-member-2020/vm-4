class WalletView {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    this.walletModel.addObserver(this.render);
  }

  render() {
    // 지갑 화면 렌더링
  }

  bindOnClickListener(handler) {
    // (임의 작성)
    const walletState = document.querySelector(".wallet-state");
    walletState.addEventListener("click", e => {
      // 클릭된 대상이 버튼이 아니면 바로 리턴 (임의 작성)
      if (target !== button) return;
      handler(e.target);
    });
  }
}
