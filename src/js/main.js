import VendingMachineModel from "./models/vendingMachineModel.js";
import WalletModel from "./models/walletModel.js";
import ItemPanelView from "./views/itemPanelView.js";
import StatePanelView from "./views/statePanelView.js";
import WalletView from "./views/walletView.js";
import Controller from "./controllers/controller.js";

const vendingMachineModel = new VendingMachineModel();
const walletModel = new WalletModel();

const itemPanelView = new ItemPanelView(vendingMachineModel, walletModel);
const statePanelView = new StatePanelView(vendingMachineModel, walletModel);
const walletView = new WalletView(walletModel);

const controller = new Controller({
  model: { vendingMachineModel, walletModel },
  view: { itemPanelView, statePanelView, walletView }
});

window.addEventListener("DOMContentLoaded", () => {
  controller.init();
});
