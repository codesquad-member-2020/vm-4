import httpRequest from "../util/http.js";
import ItemModel from "./models/itemModel.js";
import WalletModel from "./models/walletModel.js";
import ItemPanelView from "./views/itemPanelView.js";
import StatePanelView from "./views/statePanelView.js";
import WalletView from "./views/walletView.js";
import Controller from "./controllers/controller.js";

const httpRequestModule = new httpRequest();

const itemModel = new ItemModel(url, httpRequestModule);
const walletModel = new WalletModel(url, httpRequestModule);

const itemPanelView = new ItemPanelView(itemModel, walletModel);
const statePanelView = new StatePanelView(itemModel, walletModel);
const walletView = new WalletView(walletModel);

const controller = new Controller({
  model: { itemModel, walletModel },
  view: { itemPanelView, statePanelView, walletView }
});

window.addEventListener("DOMContentLoaded", () => {
  controller.init();
});
