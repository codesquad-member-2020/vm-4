import { selectorNames, errorMessage } from "../util/constant.js";
import { statePanel } from "./template.js";

export default class StatePanelView {
  constructor(vendingMachineModel, walletModel) {
    this.vendingMachineModel = vendingMachineModel;
    this.walletModel = walletModel;
    this.messageEl = null;
    this.money = null;
    this.selectItem = [];
    this.statusMoney = 0;
  }

  registerAsObserver() {
    this.vendingMachineModel.addObserver("loadData", this.render.bind(this));
    this.vendingMachineModel.addObserver("inputMoney", this.updateMoneyView.bind(this));
    this.vendingMachineModel.addObserver("inputMoneyMsg", this.updateStatePanelView.bind(this));
    this.vendingMachineModel.addObserver("purchaseItem", this.updateMessageView.bind(this));
    this.vendingMachineModel.addObserver("throwError", this.updateErrorView.bind(this));
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

  updateMessage(message){
    const resultMessage = message.reduce((total,add) => (total += `<p>${add}${(typeof add !== 'number') ?"를 선택":"원을 투입"}했습니다.</p>`),"")
    return resultMessage;
  }

  updateMessageView(data) {
    this.selectItem.push(data.name);
    this.renderMessage();
  }

  updateStatePanelView(data) {
    this.selectItem.push(parseInt(data));
    this.renderMessage()
  }
  renderMessage(){
    this.messageEl.innerHTML = this.updateMessage(this.selectItem)
  }
  updateCalcMoney(data) {
    this.statusMoney -= data.price;
    this.updateMoneyView(this.statusMoney);
  }

  updateMoneyView(data){
    this.statusMoney = data;
    this.moneyEl.innerHTML = `<span>${this.statusMoney}</span>`;
  }

  updateErrorView(errormassage) {
    this.messageEl.innerHTML = `<P>${errormassage}</P>`;
  }

  clearStatePanelView() {
    this.statusMoney = 0;
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
