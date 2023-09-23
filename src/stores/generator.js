import { writable } from "svelte/store";

let _generator = "";

const generatorStore = writable(_generator);
const { subscribe, set } = generatorStore;

export const generator = {
  subscribe,
  set: (generator) => {
    set(generator);
  },
  update: (generator) => {
    set(generator);
  },
  read: () => {
    return _generator;
  },
  reset: () => {
    set("");
  },
};
