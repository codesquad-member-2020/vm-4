# Vending Machine

### 📷 Screenshot
![vending machine](https://i.postimg.cc/pVwdytmy/image.png)

<br />

### 🕹️ How to use

[▶️ Demo](https://codesquad-memeber-2020.github.io/vm-4/)

1. 오른쪽에 위치한 지갑 화면에서 동전을 클릭하여 자판기에 돈을 투입합니다.

2. 투입 금액에 따라 구매 가능한 상품이 무엇인지 확인합니다.
    > 가격이 빨강색으로 하이라이팅된 상품만 구매 가능!

3. 가운데 상태 패널에서 원하는 상품의 번호를 누른 뒤 `선택` 버튼을 눌러 상품을 구매합니다.
    > 상품번호는 왼쪽 상단부터 1, 2, 3 ... 순서대로 부여되어 있습니다. (콜라: 1번, 칸쵸: 20번)

<br />

### ⚙️ Features
<img src="https://i.postimg.cc/15DJNj6m/image.png" alt="views" width="400" />

|feature|status|
|:---|:---:|
|`walletView`에서 동전을 누르면 `statePanelView`에 금액이 표시된다.|✔️|
|`walletView`에서 동전을 누르면 동전 갯수와 총액이 변경된다.|✔️|
|상품은 `statePanelView`에서 0부터 9까지의 버튼을 눌러 선택한다. (콜라: 1번, 칸쵸: 20번)|✔️|
|총 투입금액에 따라 `itemPanelView`에서 구매할 수 있는 상품이 하이라이팅 된다.|✔️|
|모든 이벤트는 메시지창 화면에 표시된다.|✔️|

<br />

### 🚧 Code Structure

#### Data Flow
<img src="https://i.postimg.cc/26Vbcg5Z/image.png" alt="data flow" width="600" />

#### Models
- `vendingMachineModel`, `walletModel`
- view와 controller의 존재를 모른채 데이터를 제어하는 역할만 수행합니다.
- 가장 최신의 데이터 상태를 localStorage에 동기화합니다.
- Observer pattern에서 observable에 해당하며 `observable`클래스를 상속받아 생성됩니다.
- observer를 등록할때 **type**인자를 함께 전달받아 이벤트(데이터로드, 동전투입, 상품구매 등)에 따라 선택적으로 notify하여 view를 업데이트 합니다.

#### Views
- `itemPanelView`, `statePanelView`, `walletView`
- 자신이 구독하고 있는 model로부터 데이터를 전달받아 화면에 표시하는 역할을 합니다. 
- Observer 패턴에서 observer에 해당하며 model(observable)을 주입받아 내부에서 구독합니다.

#### Controller
- view에서 발생한 사용자 이벤트(상품 번호 클릭, 동전 클릭)에 따라 model이 데이터를 업데이트하고 최신 상태의 데이터를 view에 전달할 수 있도록 합니다.
- 중재자 역할을 하기 때문에 모든 model과 view를 주입받아 생성됩니다.

<br />

---

- [vendingMachine 구현 상세](https://github.com/codesquad-memeber-2020/vm-4/issues/35)
- [wallet 구현 상세](https://github.com/codesquad-memeber-2020/vm-4/issues/38)
