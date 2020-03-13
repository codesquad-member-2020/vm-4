import { selectorNames } from "./constant.js";

export function itemPanel(_, data) {
  const { VM_ITEMS, ITEM_LIST } = selectorNames;
  const itemList = data.reduce((list, item) => {
    list += `<li>${item.name}<span>${item.price}</span></li>`;
    return list;
  }, "");
  return `<div id=${VM_ITEMS}><ul class=${ITEM_LIST}>${itemList}</ul></div>`;
}

export function statePanel(_, data) {
  const { VM_STATE, STATE_MONEY, STATE_NUMBERS, STATE_MESSAGE } = selectorNames;
  const numbers = [...Array(11).keys()].map(i => i + 1);
  numbers[numbers.length - 1] = "선택";

  const buttons = numbers.reduce((btns, number) => {
    btns += `<li><button>${number}</button></li>`;
    return btns;
  }, "");

  const stateMoney = `<div class=${STATE_MONEY}><span>0</span>원</div>`;
  const stateNumbers = `<div class=${STATE_NUMBERS}><ul>${buttons}</ul></div>`;
  const stateMessage = `<div class=${STATE_MESSAGE}></div>`;

  return `<div id=${VM_STATE}>${stateMoney}${stateNumbers}${stateMessage}</div>`;
}

export function wallet(_, data) {
  const { WALLET, WALLET_STATE, WALLET_TOTAL } = selectorNames;
  let walletList = "";
  let total = 0;
  for (let [money, count] of Object.entries(data)) {
    walletList += `<li><button value=${money}>${money}원</button><span>${count}개</span></li>`;
    total += money * count;
  }

  let totalWithComma = "";
  let totalString = total + "";
  for (let i = totalString.length; i > 0; i -= 3) {
    i - 3 > 0
      ? (totalWithComma = `,${totalString.slice(i - 3, i)}` + totalWithComma)
      : (totalWithComma = `${totalString.slice(0, i)}` + totalWithComma);
  }

  const walletState = `<div class=${WALLET_STATE}><ul>${walletList}</ul></div>`;
  const walletTotal = `<div class=${WALLET_TOTAL}>${totalWithComma}원</div>`;

  return `<div id=${WALLET}>${walletState}${walletTotal}</div>`;
}
