import Observable from "../util/observable.js";
import http from "../util/http.js";

export default class WalletModel extends Observable {
  constructor(requestUrl) {
    super();
    this.url = requestUrl;
    this.wallet = null;
  }

  getInitialData() {
    http.get(this.url);
    // response받은 데이터를 this.wallet에 할당
  }

  init() {
    // server로부터 지갑 데이터 가져오기
    this.getInitialData();
    // 데이터 로드가 완료되면 notify 메소드 실행하여 observers(Views) 업데이트
    this.notify(this.wallet);
  }

  updateWallet() {
    // controller가 호출할 메서드.
    // this.wallet 업데이트하고 server에 wallet 데이터를 전송하여 db를 최신상태로 업데이트
    http.post(this.url);
  }
}
