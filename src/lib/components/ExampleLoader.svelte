<script>
	import { userText } from '$stores/text.js';
  import { afterUpdate, createEventDispatcher, getContext, onMount } from 'svelte';
  import { generators, examples } from '$utils/generators.js';
  import { generator } from '$stores/generator.js';
  import { fileContents } from '$stores/file_contents.js';
  import { writable } from 'svelte/store';
  import { userText } from '$stores/text.js';

	import Modal from 'svelte-simple-modal';
  import Popup from '$lib/components/Popup.svelte';

  const resetIconBlack = "https://icons8.com/icon/eYceOAlmU2md/reset"
  const resetIconWhite = "https://icons8.com/icon/eYceOAlmU2md/reset"
  const resetIcon = window.matchMedia('(prefers-color-scheme: dark)').matches ? resetIconWhite : resetIconBlack;

  const dispatch = createEventDispatcher();
  const modal = writable(null);

  let currentContext = getContext('filedata');

  $: selectedOption = 'Select a generator...';
  $: selected = $generator;
  $: transformed = getContext('transformed');
  $: isDisabled = selectedOption === "Select a generator..." || transformed == false ? false : "disabled";

  onMount(() => {
    if (currentContext === 'example') {
      selectedOption = examples[0];
    }
  });

  afterUpdate(() => {
    transformed = getContext('transformed');

  });

  function updateSelected(event) {
    selectedOption = event.target.value;
    $generator = selectedOption;
    dispatch('generatorselected', selectedOption);
  }

  async function loadFileContents() {
    if (!selectedOption) return;

    $generator = selectedOption;
    const showModal = () => modal.set(Popup);

    showModal();
    let group = document.getElementById(selectedOption).classList[0];

    if (currentContext === 'example') {
      group = 'Example';
    }

    try {
      selectedOption = selectedOption.replace(/:/g, '_');
      const response = await fetch(`src/assets/rails_generators/${group.toLowerCase()}_${selectedOption}.txt`);
      let content = await response.text();
      fileContents.update(content);
    } catch (error) {
      console.error('Error loading file:', error);
    }
  }

  function reset() {
    selectedOption = 'Select a generator...';
    $generator = selectedOption;
    dispatch('generatorselected', selectedOption);
    modal.set(null);
    userText.update('');
  }
</script>

<div class="generator-selection">
  <select name="select-generator" bind:value={selectedOption} on:change={updateSelected} >
    <option value={selectedOption}>{selectedOption}</option>

    {#each Object.keys(generators) as group}
      <optgroup label={group}>
        {#each generators[group] as option}
          <option value={option} class={group} id={option}>{option}</option>
        {/each}
      </optgroup>
    {/each}
  </select>

  {#if selectedOption !== 'Select a generator...'}
    <Modal show={$modal}>
      <button on:click={loadFileContents}>View Generator Details</button>
    </Modal>
  {/if}

  {#if transformed}
      <img src={resetIcon} on:click={reset} alt="reset icon button"/>
  {/if}

  {#if currentContext === 'example'}
    <select name="select-generator" bind:value={exampleData} on:change={updateSelected}>
      <option value="">Select Example Data to Load</option>

      {#each Object.keys(examples) as group}
        <optgroup label={group}>
          {#each generators[group] as option}
            <option value={option} class={group} id={option}>{option}</option>
          {/each}
        </optgroup>
      {/each}
    </select>
  {/if}
</div>

<style>
  .generator-selection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 1rem;

    margin-top: 1.5rem;
    margin-bottom: inherit;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .select-generator {
    flex: 1;
  }

  .content-viewable {
    flex: 1;
  }
</style>

