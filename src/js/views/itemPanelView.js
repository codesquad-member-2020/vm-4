import { selectorNames } from "../../util/constant.js";
import { itemPanel } from "./template.js";

export default class ItemPanelView {
  constructor(vendingMachineModel, walletModel) {
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel = walletModel;
    this.menu = null;
    this.statusMoney = null;
  }

  registerAsObserver() {
    this.vendingMachineModel.addObserver("loadData", this.render.bind(this));
    this.vendingMachineModel.addObserver(
      "inputMoney",
      this.updateItemPanelView.bind(this)
    );
    this.vendingMachineModel.addObserver("purchaseItem", this.updateItemPanelView.bind(this));
    this.vendingMachineModel.addObserver("completed", this.init.bind(this));
  }

  render(data) {
    this.menu = data;
    const vendingMachine = document.getElementById(selectorNames.VM);
    const itemPanelView = itemPanel`${data}`;
    vendingMachine.insertAdjacentHTML("beforeend", itemPanelView);
  }

  updateItemPanelView(data) {
    typeof data === "object" ? this.statusMoney -= data.price : this.statusMoney = data;
    const itemList = document.querySelectorAll(".item-list li");
    const itemListArray = Array.from(itemList);
    const filterItems = this.menu.filter(v => v.price <= this.statusMoney);
    itemListArray.forEach(v => v.classList.remove("active"));
    filterItems.forEach(element => {
      itemListArray[element.id - 1].classList.add("active");
    });
  }

  init(){
    const itemList = document.querySelectorAll(".item-list li");
    const itemListArray = Array.from(itemList);
    itemListArray.forEach(v => v.classList.remove("active"));
  }
}