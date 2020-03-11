export default class ItemPanelView {
  constructor(itemModel, walletModel) {
    this.itemModel = itemModel;
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    // 각각의 모델에 ItemPanelView를 observer로 등록
    this.itemModel.addObserver("onLoad", this.render);
    this.walletModel.addObserver("onInputMoney", this.updateItemPanelView);
  }

  render(data) {
    // 상품 화면 렌더링
  }

  updateItemPanelView(data) {
    // 기존 highlighting 지우고
    // 투입된 액수에 따라 구입 가능한 아이템 highlighting
  }
}
