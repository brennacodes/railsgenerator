<script>
  import { createEventDispatcher, getContext, setContext, afterUpdate } from 'svelte';
  import { generators, generateFileArray } from '$utils/generators.js';
  import { writable } from 'svelte/store';
  import { generator } from '$stores/generator.js';
  import { generatorInfo } from '$stores/generator_info.js';
  import { userText } from '$stores/text.js';
  import { transformed } from '$stores/transformed.js';
  import { handleInput } from '$utils/transformer.js';
  import { userAccepted } from '$stores/user_accepted.js';

	import Modal, { bind } from 'svelte-simple-modal';
  import Popup from '$lib/components/Popup.svelte';


  const dispatch = createEventDispatcher();
  const modal = writable(null);
  const resetIconBlack = "https://img.icons8.com/sf-black-filled/32/recurring-appointment.png"
  const resetIconWhite = "https://img.icons8.com/sf-black-filled/32/ffffff/recurring-appointment.png"
  const resetIcon = window.matchMedia('(prefers-color-scheme: dark)').matches ? resetIconWhite : resetIconBlack;
  const questionIconBlack = "https://img.icons8.com/ios-filled/25/000000/help.png";
  const questionIconWhite = "https://img.icons8.com/ios-filled/25/ffffff/help.png";
  const questionIcon = window.matchMedia('(prefers-color-scheme: dark)').matches ? questionIconWhite : questionIconBlack;

  $: selectedOption = 'Select a generator...';
  $: selected = $generator;
  $: textTransformed = $transformed;
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
    userText.reset();
    transformed.reset();
  }

  afterUpdate(() => {
    let container = document.querySelector('.input-text');
    if (!container) return;
    let pasted = container.value;
    // container.style.height = '20svh';
    if (pasted == "" || pasted == undefined || pasted == null) return;


    setTimeout(() => {
      userText.update(pasted)
      handleInput(pasted, selected);
      transformed.true();

      container.scrollTop = 0;
      container.style.flexShrink = '1';
    }, 100);
  });
</script>

<div class="selection-row">
  <div class="generator-selection">
    <select class="selector" name="select-generator" bind:value={selectedOption} on:change={updateSelected} disabled={isDisabled}>
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

    {#if textTransformed}
      <div on:click={reset} on:keydown={reset} role="button" tabindex=0><img src={resetIcon} alt="reset icon button" class="reset-button"/></div>
    {/if}
  </div>

  <div class="question-mark" on:click={() => userAccepted.reset()} on:keydown={() => userAccepted.reset()} role="button" tabindex=0>
    <img src={questionIcon} alt="question mark icon button" class="question-button"/>
  </div>
</div>

<style>
  .selection-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .question-mark {
    display: flex;
  }

  .question-button {
    display: flex;
  }

  .reset-button {
    display: flex;
  }

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

