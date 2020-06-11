export const $select = el => document.querySelector(el);
export const $selectAll = el => document.querySelectorAll(el);
export const $getById = id => document.getElementById(id);
export const $addListener = (target, type, callback) => target.addEventListener(type, callback);