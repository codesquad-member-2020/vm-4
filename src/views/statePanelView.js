export default class StatePanelView {
  constructor(itemModel, walletModel) {
    this.itemModel = itemModel;
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    // 각각의 모델에 StatePanelView를 observer로 등록
    this.itemModel.addObserver(this.updateMessageView);
    this.walletModel.addObserver(this.updateTotalAmountView);
  }

  render() {
    // 상품 선택 화면 렌더링
  }

  bindOnClickListener(handler) {
    // (임의 작성)
    const buttonArea = document.querySelector(".buttonArea");
    buttonArea.addEventListener("click", e => {
      // 클릭된 대상이 버튼이 아니면 바로 리턴 (임의 작성)
      if (target !== button) return;
      handler(e.target.textContent);
    });
  }
}
