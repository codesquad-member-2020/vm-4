import { selectorNames, observerType } from "../../util/constant.js";
import { $select, $getById } from "../../util/utilFunc.js";
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
    this.vendingMachineModel.addObserver(observerType.loadData, this.render.bind(this));
    this.vendingMachineModel.addObserver(observerType.inputMoney, this.updateMoneyView.bind(this));
    this.vendingMachineModel.addObserver(
      observerType.inputMoneyMsg,
      this.updateStatePanelView.bind(this)
    );
    this.vendingMachineModel.addObserver(
      observerType.purchaseItem,
      this.updateMessageView.bind(this)
    );
    this.vendingMachineModel.addObserver(observerType.throwError, this.updateErrorView.bind(this));
    this.vendingMachineModel.addObserver(
      observerType.purchaseItem,
      this.updateCalcMoney.bind(this)
    );
    this.vendingMachineModel.addObserver(
      observerType.completed,
      this.clearStatePanelView.bind(this)
    );
  }

  render(data) {
    const vendingMachine = $getById(selectorNames.VM);
    const statePanelView = statePanel`${data}`;
    vendingMachine.insertAdjacentHTML("beforeend", statePanelView);
    this.messageEl = $select(".state-message");
    this.moneyEl = $select(".state-money");
  }

  updateMessage(message) {
    const resultMessage = message.reduce(
      (total, add) =>
        (total += `<p>${
          typeof add !== "number"
            ? typeof add !== "object"
              ? add + "를 선택"
              : add.price + "원을 반환"
            : add + "원을 투입"
        }했습니다.</p>`),
      ""
    );
    return resultMessage;
  }

  updateMessageView(data) {
    this.selectItem.push(data.name);
    this.renderMessage();
  }

  updateStatePanelView(data) {
    this.selectItem.push(parseInt(data));
    this.renderMessage();
  }

  renderMessage() {
    this.messageEl.innerHTML = this.updateMessage(this.selectItem);
  }

  updateCalcMoney(data) {
    this.statusMoney -= data.price;
    this.updateMoneyView(this.statusMoney);
  }

  updateMoneyView(data) {
    this.statusMoney = data;
    this.moneyEl.innerHTML = `<span>${this.statusMoney}</span>`;
  }

  updateErrorView(errormassage) {
    this.messageEl.innerHTML = `<P>${errormassage}</P>`;
  }

  clearStatePanelView() {
    this.selectItem.push({ price: this.statusMoney });
    this.renderMessage();
    this.statusMoney = 0;
    this.selectItem = [];
    this.updateMoneyView(this.statusMoney);
  }

  bindOnClickListener(handler) {
    const statePanelButtonArea = $select(".state-numbers");
    statePanelButtonArea.addEventListener("click", e => {
      if (e.target.nodeName !== "BUTTON") return;
      handler(e.target.value);
    });
  }
}
