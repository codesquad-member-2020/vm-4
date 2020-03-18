export default class Controller {
  constructor({
    model: { vendingMachineModel, walletModel },
    view: { itemPanelView, statePanelView, walletView }
  }) {
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel = walletModel;

    this.itemPanelView = itemPanelView;
    this.statePanelView = statePanelView;
    this.walletView = walletView;

    this.inputMoneyLog = {};
    this.totalInputMoney = 0;
    // 숫자 버튼 클릭될 때 마다 배열에 추가한 뒤 '선택' 버튼을 클릭했을 때 배열에 있는 숫자를 취합하여 controller에 전달
    this.selectedItemId = [];
  }

  itemClickHandler(selectNumber) {
    if (selectNumber === "선택") {
      const menuId = this.selectedItemId.join("");
      this.selectedItemId = [];
      this.vendingMachineModel.setSelectedItem(menuId);
    } else {
      this.selectedItemId.push(selectNumber);
    }
  }

  walletClickHandler() {}

  async init() {
    // register observers
    this.itemPanelView.registerAsObserver();
    this.statePanelView.registerAsObserver();
    this.walletView.registerAsObserver();

    // fetch data & render UI
    await this.vendingMachineModel.getInitialData();
    await this.walletModel.getInitialData();

    // bind eventListeners
    this.statePanelView.bindOnClickListener(this.itemClickHandler.bind(this));
    this.walletView.bindOnClickListener(this.walletClickHandler);
  }
}
