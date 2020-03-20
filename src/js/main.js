import httpRequest from "../util/http.js";
import VendingMachineModel from "./models/vendingMachineModel.js";
import WalletModel from "./models/walletModel.js";
import ItemPanelView from "./views/itemPanelView.js";
import StatePanelView from "./views/statePanelView.js";
import WalletView from "./views/walletView.js";
import Controller from "./controllers/controller.js";

const itemDataUrl = "http://localhost:8081/vendingmachine/items";

const httpRequestModule = new httpRequest();

const vendingMachineModel = new VendingMachineModel(itemDataUrl, httpRequestModule);
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
