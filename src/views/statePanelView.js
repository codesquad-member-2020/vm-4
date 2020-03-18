import { selectorNames } from "../util/constant.js";
import { statePanel } from "./template.js";

export default class StatePanelView {
  constructor(vendingMachineModel, walletModel) {
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel = walletModel;
    this.messageEl = null;
    this.money = null;
    this.selectItem = [];
    this.statusMoney = null;
  }

  registerAsObserver() {
    // 각각의 모델에 StatePanelView를 observer로 등록
    this.vendingMachineModel.addObserver("loadData", this.render.bind(this));
    this.vendingMachineModel.addObserver("inputMoney", this.updateStatePanelView.bind(this));
    this.vendingMachineModel.addObserver("purchaseItem", this.updateMessageView.bind(this));
    this.vendingMachineModel.addObserver("purchaseItem", this.updateCalcMoney.bind(this));
    this.walletModel.addObserver("purchaseItem", this.clearStatePanelView.bind(this));
  }

  render(data) {
    const vendingMachine = document.getElementById(selectorNames.VM);
    const statePanelView = statePanel`${data}`;
    vendingMachine.insertAdjacentHTML("beforeend", statePanelView);
    this.messageEl = document.querySelector(".state-message");
    this.moneyEl = document.querySelector(".state-money");
  }

  updateMessageView(data) {
    // 현황판 업데이트
    this.selectItem.push(data);
    const selectedMessage = this.selectItem.reduce((addMessage, item) => (addMessage += `<p>${item.name} 선택했습니다.</p>`),"");
    this.messageEl.innerHTML = selectedMessage;
  }
  
  updateStatePanelView(data) {
    this.statusMoney = data;
    this.messageEl.innerHTML = `총 투입금액은 ${this.statusMoney}원 입니다.`;
    this.updateMoneyView();
  }
  updateCalcMoney(data) {
    this.statusMoney -= data.price;
    this.updateMoneyView();
  }
  updateMoneyView(){
    this.moneyEl.innerHTML = `<span>${this.statusMoney}</span>`;
  }

  clearStatePanelView() {
    // 상태 패널 초기화
    this.statusMoney = null;
    this.selectItem = [];
  }

  bindOnClickListener(handler) {
    const statePanelButtonArea = document.querySelector(".state-numbers");
    statePanelButtonArea.addEventListener("click", e => {
      if (e.target.nodeName !== "BUTTON") return;
      handler(e.target.value);
    });
  }
}
