export default class StatePanelView {
  constructor(itemModel, walletModel, controller) {
    this.itemModel = itemModel;
    this.walletModel = walletModel;
    this.controller = controller;
  }

  registerAsObserver() {
    // 각각의 모델에 StatePanelView를 observer로 등록
    this.itemModel.addObserver(this.updateMessageView);
    this.walletModel.addObserver(this.updateTotalAmountView);
  }

  render() {
    // 상품 선택 화면 렌더링
  }

  bindEventListener() {
    // (임의 작성)
    const buttonArea = document.querySelector(".buttonArea");
    buttonArea.addEventListener("click", e => this.controller.onClickItemHandler(e.target));
  }

  updateMessageView(data) {
    // 현황판 업데이트
  }

  updateTotalAmountView(totalAmount) {
    // 총 투입 금액 업데이트
  }
}
