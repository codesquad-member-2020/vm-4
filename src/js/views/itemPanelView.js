import { selectorNames, observerType } from "../../util/constant.js";
import { $selectAll, $getById } from "../../util/utilFunc.js";
import { itemPanel } from "./template.js";

export default class ItemPanelView {
  constructor(vendingMachineModel, walletModel) {
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel = walletModel;
    this.menu = null;
    this.statusMoney = null;
  }

  registerAsObserver() {
    this.vendingMachineModel.addObserver(observerType.loadData, this.render.bind(this));
    this.vendingMachineModel.addObserver(
      observerType.inputMoney,
      this.updateItemPanelView.bind(this)
    );
    this.vendingMachineModel.addObserver(
      observerType.purchaseItem,
      this.updateItemPanelView.bind(this)
    );
    this.vendingMachineModel.addObserver(observerType.completed, this.init.bind(this));
  }

  render(data) {
    this.menu = data;
    const vendingMachine = $getById(selectorNames.VM);
    const itemPanelView = itemPanel`${data}`;
    vendingMachine.insertAdjacentHTML("beforeend", itemPanelView);
  }

  updateItemPanelView(data) {
    typeof data === "object" ? (this.statusMoney -= data.price) : (this.statusMoney = data);
    const itemList = $selectAll(".item-list li");
    const itemListArray = Array.from(itemList);
    const filterItems = this.menu.filter(v => v.price <= this.statusMoney);
    itemListArray.forEach(v => v.classList.remove("active"));
    filterItems.forEach(element => {
      itemListArray[element.id - 1].classList.add("active");
    });
  }

  init() {
    const itemList = $selectAll(".item-list li");
    const itemListArray = Array.from(itemList);
    itemListArray.forEach(v => v.classList.remove("active"));
  }
}
