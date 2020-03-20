export const selectorNames = {
  APP: "app",
  VM: "vending-machine",
  VM_ITEMS: "vm-items",
  ITEM_LIST: "item-list",
  VM_STATE: "vm-state",
  STATE_MONEY: "state-money",
  STATE_NUMBERS: "state-numbers",
  STATE_MESSAGE: "state-message",
  WALLET: "wallet",
  WALLET_STATE: "wallet-state",
  WALLET_COUNT: "wallet-count",
  WALLET_TOTAL: "wallet-total"
};

export const observerType = {
  loadData: "loadData",
  inputMoney: "inputMoney",
  purchaseItem: "purchaseItem"
};

export const moneyTypeList = [10000, 5000, 1000, 500, 100, 50, 10];

export const errorMessage = {
  notEnoughMoney : '금액이 부족합니다.',
  notInputMoney : '금액을 투입해주세요.'
}

export const mockData = {
  items: [
    { id: 1, name: "콜라", price: 500 },
    { id: 2, name: "사이다", price: 1200 },
    { id: 3, name: "파인애플맛 환타", price: 2050 },
    { id: 4, name: "포도맛 환타", price: 2050 },
    { id: 5, name: "레몬에이드", price: 3000 },
    { id: 6, name: "봉봉", price: 4200 },
    { id: 7, name: "코코아", price: 5000 },
    { id: 8, name: "코카콜라 제로", price: 3800 },
    { id: 9, name: "파워에이드", price: 6000 },
    { id: 10, name: "초코우유", price: 7010 },
    { id: 11, name: "초코우유2", price: 7020 },
    { id: 12, name: "초코우유3", price: 7030 },
    { id: 13, name: "딸바주스", price: 8500 },
    { id: 14, name: "바나나우유", price: 9000 },
    { id: 15, name: "커피우유", price: 10000 },
    { id: 16, name: "알로에주스", price: 10500 },
    { id: 17, name: "콘칩", price: 11000 },
    { id: 18, name: "새우깡", price: 12000 },
    { id: 19, name: "감자칩", price: 18000 },
    { id: 20, name: "칸쵸", price: 25000 }
  ],
  wallet: {
    "10": 20,
    "50": 30,
    "100": 25,
    "500": 15,
    "1000": 30,
    "5000": 15,
    "10000": 10
  }
};
