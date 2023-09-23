<script>
  import { createEventDispatcher } from 'svelte';
  import { generators, generateFileArray } from '$utils/generators.js';
  import { generator } from '$stores/generator.js';
  import { generatorInfo } from '$stores/generator_info.js';
  import { writable } from 'svelte/store';

	import Modal, { bind } from 'svelte-simple-modal';
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

  function loadGeneratorInfo() {
    if (!selectedOption) return;
    selectedOption = selectedOption.replace(/:/g, '_');

    $generator = selectedOption;

    const group = document.getElementById(selectedOption).classList[0];

    if (group != undefined) {
      return `${group.toLowerCase()}_${selectedOption}`;
    }
  }

  const showModal = () => {
    const infoToDisplay = loadGeneratorInfo();
    modal.set(bind(Popup, { infoToDisplay: infoToDisplay }));
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
      <button on:click={showModal}>View Generator Details</button>
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

