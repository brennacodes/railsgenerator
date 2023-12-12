import { writable } from "svelte/store";

let _transformed = false;

const transformedStore = writable(_transformed);
const { subscribe, set } = transformedStore;

export const transformed = {
  subscribe,
  true: () => {
    set(true);
  },
  read: () => {
    return _transformed;
  },
  reset: () => {
    set(false);
  }
};
