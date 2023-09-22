import { writable } from 'svelte/store';

let _fileContents = '';

const fileContentsStore = writable(_fileContents);
const { subscribe, set } = fileContentsStore;

export const fileContents = {
  subscribe,
  update: (text) => {
    set(text);
  },
  read: () => {
    return _fileContents;
  }
};
