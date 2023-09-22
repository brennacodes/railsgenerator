import { writable } from 'svelte/store';
import { pasteToGenerate } from '$lib/utils/transformer';

let _userText = '';

const userTextStore = writable(_userText);
const { subscribe, set } = userTextStore;

export const userText = {
  subscribe,
  transform: () => {
    pasteToGenerate();
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
