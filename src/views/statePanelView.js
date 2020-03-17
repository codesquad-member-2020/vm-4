import { selectorNames } from "../util/constant.js";
import { statePanel } from "./template.js";

export default class StatePanelView {
  constructor(vendingMachineModel, walletModel) {
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel = walletModel;
  }

  registerAsObserver() {
    // 각각의 모델에 StatePanelView를 observer로 등록
    this.vendingMachineModel.addObserver("loadData", this.render);
    this.vendingMachineModel.addObserver("purchaseItem", this.updateMessageView);
    this.walletModel.addObserver("inputMoney", this.updateStatePanelView);
    this.walletModel.addObserver("purchaseItem", this.clearStatePanelView);
  }

  render(data) {
    const vendingMachine = document.getElementById(selectorNames.VM);
    const statePanelView = statePanel`${data}`;
    vendingMachine.insertAdjacentHTML("beforeend", statePanelView);
  }

  updateMessageView(data) {
    // 현황판 업데이트
  }

  updateStatePanelView(data) {
    // 총 투입 금액 & 현황판 업데이트
  }

  clearStatePanelView() {
    // 상태 패널 초기화
  }

  bindOnClickListener(handler) {
    // (임의 작성)
    const statePanelButtonArea = document.querySelector(".state-numbers");
    statePanelButtonArea.addEventListener("click", e => {
      // 클릭된 대상이 버튼이 아니면 바로 리턴 (임의 작성)
      if (target !== button) return;
      handler(e.target.textContent);
    });
  }
}
