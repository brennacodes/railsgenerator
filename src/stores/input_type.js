import { writable } from 'svelte/store';

let _inputType;

const inputTypeStore = writable(_inputType);
const { subscribe, set } = inputTypeStore;

export const inputType = {
  subscribe,
  set: (type) => {
    set(type);
  },
  update: (type) => {
    set(type);
  },
  read: () => {
    return _inputType;
  },
  reset: () => {
    set('');
  }
};
