import Observable from "../util/observable.js";

export default class VendingMachineModel extends Observable {
  constructor(requestUrl, httpRequestModule) {
    super();
    this.url = requestUrl;
    this.http = httpRequestModule;
    this.menu = null;
    this.selectedMenu = [];
  }
  getInitialData() {
    return new Promise(res => {
      res(
        this.http.get(this.url).then(data => {
          this.menu = data;
          localStorage.setItem("menuDB", JSON.stringify(this.menu));
          this.notify("loadData", this.menu);
        })
      );
    });
    // response받은 데이터를 this.menu에 할당
    // 데이터 로드가 완료되면 notify 메소드 실행하여 observers(Views) 업데이트
  }
  inputMoney(price) {
    this.notify("inputMoney", price);
  }
  matchingMenu(price) {
    this.menu.forEach(menu => {
      if (menu.price <= price) return this.selectedMenu.push(menu);
    });
    this.notify("inputMoney", this.selectedMenu);
  }
  setSelectedItem(menuId) {
    // 아이템 번호를 넘겨 받음
    // 해당되는 아이템 번호를 구독 알림
    const selectedItem = this.menu.filter(menu => menu.id == menuId);
    this.notify("purchaseItem", selectedItem);
  }
}
