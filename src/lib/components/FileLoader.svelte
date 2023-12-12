<script>
  import { createEventDispatcher, getContext, setContext, afterUpdate } from 'svelte';
  import { generators, generateFileArray } from '$utils/generators.js';
  import { generator } from '$stores/generator.js';
  import { generatorInfo } from '$stores/generator_info.js';
  import { writable } from 'svelte/store';
  import { userText } from '$stores/text.js';

	import Modal, { bind } from 'svelte-simple-modal';
  import Popup from '$lib/components/Popup.svelte';


  const dispatch = createEventDispatcher();
  const modal = writable(null);
  const resetIconBlack = "https://icons8.com/icon/eYceOAlmU2md/reset"
  const resetIconWhite = "https://icons8.com/icon/eYceOAlmU2md/reset"
  const resetIcon = window.matchMedia('(prefers-color-scheme: dark)').matches ? resetIconWhite : resetIconBlack;

  $: selectedOption = 'Select a generator...';
  $: selected = $generator;
  $: transformed = getContext('transformed');
  $: isDisabled = selectedOption === "Select a generator..." || transformed == false ? '' : 'disabled';

  function updateSelected(event) {
    selectedOption = event.target.value;
    $generator = selectedOption;
    dispatch('generatorselected', selectedOption);
  }

  function setUserAccepted() {
    userAccepted = true;
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

  function reset() {
    selectedOption = 'Select a generator...';
    $generator = selectedOption;
    dispatch('generatorselected', selectedOption);
    modal.set(null);
    userText.update('');
  }

</script>

<div class="generator-selection">
  <select name="select-generator" bind:value={selectedOption} on:change={updateSelected} {isDisabled}>
    <option value={selectedOption}>{selectedOption}</option>

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

  {#if transformed}
    <div on:click={reset} on:keydown={reset} role="button" tabindex=0><img src={resetIcon} alt="reset icon button"/></div>
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

