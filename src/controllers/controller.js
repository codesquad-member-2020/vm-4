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
    this.selectedItemId = [];
    this.itemData = null;
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

  walletClickHandler(selectedMoney) {
    this.vendingMachineModel.updateWhenInputMoney(selectedMoney);
    this.walletModel.updateWhenInputMoney(selectedMoney);
  }

  async init() {
    // register observers
    this.itemPanelView.registerAsObserver();
    this.statePanelView.registerAsObserver();
    this.walletView.registerAsObserver();

    // fetch data & render UI
    await this.vendingMachineModel.getInitialData();
    await this.walletModel.getInitialData();

    // cached itemData
    this.itemData = JSON.parse(localStorage.getItem(""));

    // bind eventListeners
    this.statePanelView.bindOnClickListener(this.itemClickHandler.bind(this));
    this.walletView.bindOnClickListener(this.walletClickHandler.bind(this));
  }
}
