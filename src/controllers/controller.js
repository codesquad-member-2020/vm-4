export default class Controller {
  constructor(menuModel, walletModel) {
    this.menuModel = menuModel;
    this.walletModel = walletModel;
    this.totalInputAmount = 0;
    // 숫자 버튼 클릭될 때 마다 배열에 추가한 뒤 '입력' 버튼을 클릭했을 때 배열에 있는 숫자를 취합하여 controller에 전달
    this.selectedItemId = [];
  }

  onClickItemHandler(target) {
    // 클릭된 대상이 버튼이 아니면 바로 리턴 (임의 작성)
    if (target !== button) return;

    // '선택' 버튼 클릭 시 menuModel 업데이트 (임의 작성)
    const selectBtn = document.querySelector(".select");
    if (target === selectBtn) {
      const menuId = this.selectedItemId.join("");
      this.menuModel.onSelectItem(menuId);
    } else {
      this.selectedItemId.push(target.textContent);
    }
  }

  onClickWalletHandler() {
    // 클릭된 금액 확인하여 walletModel 업데이트
  }
}
