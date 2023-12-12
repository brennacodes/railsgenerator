import { writable } from 'svelte/store';

let _userAccepted = false;
const userAcceptedStore = writable(_userAccepted);
const { subscribe, set } = userAcceptedStore;

export const userAccepted = {
  subscribe,
  true: () => {
    set(true);
  },
  read: () => {
    return _userAccepted;
  },
  reset: () => {
    set(false);
  }
};
