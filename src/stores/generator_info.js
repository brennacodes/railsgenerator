import { writable } from 'svelte/store';
import { generateFileArray } from '$utils/generators.js';
import { generateImportStatements } from '$utils/importer.js';

generateImportStatements(generateFileArray());

const generatorFiles = generateFileArray();

let _generatorInfo = '';

const generatorInfoStore = writable(_generatorInfo);
const { subscribe, set } = generatorInfoStore;

export const generatorInfo = {
  subscribe,
  seach: (generator) => {
    const file = generatorFiles.find(file => file.includes(generator));
    return file;
  },
  load: (selected) => {
    const file = generatorInfo.seach(selected)
    reader.readAsText(file);
    reader.onload = () => {
      generatorInfo.update(reader.result);
      return _generatorInfo;
    }
  },
  update: (text) => {
    _generatorInfo = text;
    set(text);
  },
  read: () => {
    return _generatorInfo;
  },
  reset: () => {
    set('');
  }
};
