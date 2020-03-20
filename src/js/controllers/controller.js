import { errorMessage } from "../../util/constant.js";
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
    this.totalMoney = null;
  }

  itemClickHandler(selectNumber) {
    if (selectNumber === "선택") {
      const menuId = this.selectedItemId.join("");
      this.selectedItemId = [];
      this.calcMoney(menuId);
      this.getBackMoney();
    } else {
      this.selectedItemId.push(selectNumber);
    }
  }

  walletClickHandler(selectedMoney) {
    this.getInputMoney(selectedMoney);
    this.walletModel.updateWhenInputMoney(selectedMoney);
  }

  getInputMoney(selectedMoney) {
    this.totalMoney += parseInt(selectedMoney);
    this.vendingMachineModel.updateWhenInputMoney(this.totalMoney);
    this.vendingMachineModel.updateInputMoneyMsg(selectedMoney);
  }

  getBackMoney() {
    this.walletModel.updateWhenPurchaseItem(this.totalMoney);
    this.vendingMachineModel.init();
    this.totalMoney = 0;
  }

  calcMoney(menuId) {
    let selectedItem = this.itemData.find(menu => menu.id == menuId);
    if (this.totalMoney < selectedItem.price)
      return this.vendingMachineModel.throwError(errorMessage.notEnoughMoney);
    this.totalMoney -= selectedItem.price;
    this.vendingMachineModel.setSelectedItem(selectedItem);
  }

  async init() {
    // register observers
    this.itemPanelView.registerAsObserver();
    this.statePanelView.registerAsObserver();
    this.walletView.registerAsObserver();

    // fetch data & render View
    await this.vendingMachineModel.getInitialData();
    this.walletModel.getInitialData();

    // cached itemData
    this.itemData = JSON.parse(localStorage.getItem("menuDB"));

    // bind eventListeners
    this.statePanelView.bindOnClickListener(this.itemClickHandler.bind(this));
    this.walletView.bindOnClickListener(this.walletClickHandler.bind(this));
  }
}