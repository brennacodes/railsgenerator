import { writable } from 'svelte/store';
// import { generator } from '$stores/generator';
import { handleSQL } from '$lib/utils/transformer';

let _userText = '';

const userTextStore = writable(_userText);
const { subscribe, set } = userTextStore;

export const userText = {
  subscribe,
  transform: (text) => {
    handleSQL(text);
  },
  update: (text) => {
    set(text);
  },
  read: () => {
    return _userText;
  },
  reset: () => {
    set('');
  }
};
