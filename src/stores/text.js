import { writable } from 'svelte/store';

let _userText;

const userTextStore = writable(_userText);
const { subscribe, set } = userTextStore;

export const userText = {
  subscribe,
  transform: () => {
    return _userText.toUpperCase();
  },
  set: (text) => {
    _userText = text;
    set(_userText);
  },
  read: () => {
    return _userText;
  },
  reset: set(_userText)
};
