export default class Controller {
  constructor({
    model: { itemModel, walletModel },
    view: { itemPanelView, statePanelView, walletView }
  }) {
    this.itemModel = itemModel;
    this.walletModel = walletModel;

    this.itemPanelView = itemPanelView;
    this.statePanelView = statePanelView;
    this.walletView = walletView;

    this.inputMoneyLog = {};
    this.totalInputMoney = 0;
    // 숫자 버튼 클릭될 때 마다 배열에 추가한 뒤 '선택' 버튼을 클릭했을 때 배열에 있는 숫자를 취합하여 controller에 전달
    this.selectedItemId = [];
  }

  onClickItemHandler(label) {
    // '선택' 버튼 클릭 시 itemModel 업데이트 (임의 작성)
    if (label === "선택") {
      const menuId = this.selectedItemId.join("");
      this.itemModel.setSelectedItem(menuId);
    } else {
      this.selectedItemId.push(target.textContent);
    }
  }

  onClickWalletHandler(price) {
    // 클릭된 금액 확인하여 walletModel 업데이트
  }

  init() {
    // register observers
    this.itemPanelView.registerAsObserver();
    this.statePanelView.registerAsObserver();
    this.walletView.registerAsObserver();

    // fetch data & render UI
    this.itemModel.getInitialData();
    this.walletModel.getInitialData();

    // bind eventListeners
    this.statePanelView.bindOnClickListener(this.onClickItemHandler);
    this.walletView.bindOnClickListener(this.onClickWalletHandler);
  }
}
