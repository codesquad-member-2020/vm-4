import Observable from "../util/observable.js";
import http from "../util/http.js";

export default class ItemModel extends Observable {
  constructor(requestUrl) {
    super();
    this.url = requestUrl;
    this.menu = null;
    // this.selectedItem = null;
  }

  getInitialData() {
    http.get(this.url);
    // response받은 데이터를 this.menu에 할당
    // 데이터 로드가 완료되면 notify 메소드 실행하여 observers(Views) 업데이트
  }
}
