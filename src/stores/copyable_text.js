import { writable } from "svelte/store";

let _copyableText = "";
const copyableTextStore = writable(_copyableText);
const { subscribe, set } = copyableTextStore;

export const copyableText = {
  subscribe,
  update: (text) => {
    set(text);
  },
  read: () => {
    return _copyableText;
  },
  reset: () => {
    set("");
  },
};