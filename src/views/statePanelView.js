export default class StatePanelView {
  constructor(itemModel, walletModel) {
    this.itemModel = itemModel;
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    // 각각의 모델에 StatePanelView를 observer로 등록
    this.itemModel.addObserver("onPurchase", this.updateMessageView);
    this.walletModel.addObserver("onLoad", this.render);
    this.walletModel.addObserver("onInputMoney", this.updateStatePanelView);
    this.walletModel.addObserver("onPurchase", this.clearStatePanelView);
  }

  render() {
    // 상품 선택 화면 렌더링
  }

  updateMessageView(data) {
    // 현황판 업데이트
  }

  updateStatePanelView(data) {
    // 총 투입 금액 & 현황판 업데이트
  }

  clearStatePanelView() {
    // 상태 패널 초기화
  }

  bindOnClickListener(handler) {
    // (임의 작성)
    const statePanelButtonArea = document.querySelector(".state-numbers");
    statePanelButtonArea.addEventListener("click", e => {
      // 클릭된 대상이 버튼이 아니면 바로 리턴 (임의 작성)
      if (target !== button) return;
      handler(e.target.textContent);
    });
  }
}
