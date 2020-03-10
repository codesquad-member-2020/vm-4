export default class Controller {
  constructor({ model: { itemModel, walletModel }, view: { stateView, walletView } }) {
    this.itemModel = itemModel;
    this.walletModel = walletModel;

    this.stateView = stateView;
    this.walletView = walletView;

    this.stateView.bindOnClickListener(this.onClickItemHandler);
    this.walletView.bindOnClickListener(this.onClickWalletHandler);

    this.inputMoneyLog = {};
    this.totalInputMoney = 0;
    // 숫자 버튼 클릭될 때 마다 배열에 추가한 뒤 '선택' 버튼을 클릭했을 때 배열에 있는 숫자를 취합하여 controller에 전달
    this.selectedItemId = [];
  }

  onClickItemHandler(label) {
    // '선택' 버튼 클릭 시 itemModel 업데이트 (임의 작성)
    if (label === "선택") {
      const menuId = this.selectedItemId.join("");
      this.itemModel.setSelectedItem(menuId);
    } else {
      this.selectedItemId.push(target.textContent);
    }
  }

  onClickWalletHandler(price) {
    // 클릭된 금액 확인하여 walletModel 업데이트
  }
}
