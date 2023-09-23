<script>
  import { createEventDispatcher } from 'svelte';
  import { generators } from '$utils/generators.js';
  import { generator } from '$stores/generator.js';
  import { fileContents } from '$stores/file_contents.js';
  import { writable } from 'svelte/store';

	import Modal from 'svelte-simple-modal';
  import Popup from '$lib/components/Popup.svelte';

  const dispatch = createEventDispatcher();
  const modal = writable(null);


  $: selectedOption = '';
  $: selected = $generator;

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
    const group = document.getElementById(selectedOption).classList[0];

    try {
      selectedOption = selectedOption.replace(/:/g, '_');
      const response = await fetch(`./rails_generators/${group.toLowerCase()}_${selectedOption}.txt`);
      let content = await response.text();
      fileContents.update(content);
    } catch (error) {
      console.error('Error loading file:', error);
    }
  }
</script>

<div class="generator-selection">
  <select name="select-generator" bind:value={selectedOption} on:change={updateSelected}>
    <option value="">Select a generator</option>

    {#each Object.keys(generators) as group}
      <optgroup label={group}>
        {#each generators[group] as option}
          <option value={option} class={group} id={option}>{option}</option>
        {/each}
      </optgroup>
    {/each}
  </select>

  {#if selectedOption}
    <Modal show={$modal}>
      <button on:click={loadFileContents}>View Generator Details</button>
    </Modal>
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

