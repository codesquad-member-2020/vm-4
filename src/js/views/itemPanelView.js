import { selectorNames } from "../../util/constant.js";
import { itemPanel } from "./template.js";

export default class ItemPanelView {
  constructor(vendingMachineModel, walletModel) {
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    // 각각의 모델에 ItemPanelView를 observer로 등록
    this.vendingMachineModel.addObserver("loadData", this.render);
    // this.walletModel.addObserver("inputMoney", this.updateItemPanelView);
  }

  render(data) {
    const vendingMachine = document.getElementById(selectorNames.VM);
    const itemPanelView = itemPanel`${data}`;
    vendingMachine.insertAdjacentHTML("beforeend", itemPanelView);
  }

  updateItemPanelView(data) {
    // 기존 highlighting 지우고
    // 투입된 액수에 따라 구입 가능한 아이템 highlighting
  }
}
