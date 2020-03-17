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

    this.itemData = null;
  }

  onClickItemHandler() {}

  walletClickHandler(selectedMoney) {
    this.walletModel.updateWallet(selectedMoney);
  }

  init() {
    // register observers
    this.itemPanelView.registerAsObserver();
    this.statePanelView.registerAsObserver();
    this.walletView.registerAsObserver();

    // fetch data & render View
    this.itemModel.getInitialData();
    this.walletModel.getInitialData();

    // cached itemData
    this.itemData = JSON.parse(localStorage.getItem(""));

    // bind eventListeners
    this.statePanelView.bindOnClickListener(this.onClickItemHandler);
    this.walletView.bindOnClickListener(this.walletClickHandler.bind(this));
  }
}
