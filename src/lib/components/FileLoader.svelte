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
  import { supportedTypes } from '$utils/input_transformers/shared_utils.js';
  import { inputType } from '$stores/input_type.js';

	import Modal, { bind } from 'svelte-simple-modal';
  import Popup from '$lib/components/Popup.svelte';

  const dispatch = createEventDispatcher();
  const modal = writable(null);
  const resetIconBlack = "https://img.icons8.com/sf-black-filled/19/recurring-appointment.png"
  const resetIconWhite = "https://img.icons8.com/sf-black-filled/19/ffffff/recurring-appointment.png"
  const resetIcon = window.matchMedia('(prefers-color-scheme: dark)').matches ? resetIconWhite : resetIconBlack;
  const questionIconBlack = "https://img.icons8.com/ios-filled/19/000000/help.png";
  const questionIconWhite = "https://img.icons8.com/ios-filled/19/ffffff/help.png";
  const questionIcon = window.matchMedia('(prefers-color-scheme: dark)').matches ? questionIconWhite : questionIconBlack;

  $: generatorSelection = 'Select a generator...';
  $: selectedGenerator = $generator || generatorSelection;
  $: inputTypeSelection = "Select an input type...";
  $: selectedInputType = $inputType || inputTypeSelection;
  $: textTransformed = $transformed;
  $: selectGeneratorIsDisabled = selectedGenerator === "Select a generator..." || transformed == false ? '' : 'disabled';
  $: selectTypeIsDisabled = selectedInputType === "Select an input type..." ? '' : 'disabled';

  function updateSelectedInputType(event) {
    selectedInputType = event.target.value;
    $inputType = selectedInputType;
    // inputType.update(selectedInputType);
    // dispatch('generatorselected', selectedInputType);
  }

  function updateSelectedGenerator(event) {
    selectedGenerator = event.target.value;
    // generator.update(selectedGenerator);
    $generator = selectedGenerator;
    dispatch('generatorselected', selectedGenerator);
  }

  function setUserAccepted() {
    userAccepted = true;
  }

  function loadGeneratorInfo() {
    if (!selectedGenerator) return;
    selectedGenerator = selectedGenerator.replace(/:/g, '_');

    $generator = selectedGenerator;

    const group = document.getElementById(selectedGenerator).classList[0];

    if (group != undefined) {
      return `${group.toLowerCase()}_${selectedGenerator}`;
    }
  }

  const showModal = () => {
    const infoToDisplay = loadGeneratorInfo();
    modal.set(bind(Popup, { infoToDisplay: infoToDisplay }));
  }

  function resetInputType() {
    selectedInputType = 'Select an input type...';
    inputType.update(selectedInputType);
    dispatch('inputtypeselected', selectedInputType);
    userText.reset();
    transformed.reset();
  }

  function resetGenerator() {
    selectedGenerator = 'Select a generator...';
    generator.update(selectedGenerator);
    dispatch('generatorselected', selectedGenerator);
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
  <div class="input-type-selection">
    <select class="selector" name="select-input-type" bind:value={inputTypeSelection} on:change={updateSelectedInputType} disabled={selectTypeIsDisabled}>
      <option value={inputTypeSelection}>{inputTypeSelection}</option>

      {#each supportedTypes as type}
        <option value={type} class={type} id="option-{type}">{type}</option>
      {/each}
    </select>

    {#if selectedInputType !== "Select an input type..."}
      <div on:click={resetInputType} on:keydown={resetInputType} role="button" tabindex=0><img src={resetIcon} alt="reset icon button" class="reset-button"/></div>
    {/if}
  </div>
  <div class="generator-selection">
    <select class="selector" name="select-generator" bind:value={generatorSelection} on:change={updateSelectedGenerator} disabled={selectGeneratorIsDisabled}>
      <option value={generatorSelection}>{generatorSelection}</option>

      {#each Object.keys(generators) as group}
        <optgroup label={group}>
          {#each generators[group] as option}
            <option value={option} class={group} id={option}>{option}</option>
          {/each}
        </optgroup>
      {/each}
    </select>

    {#if selectedGenerator !== "Select a generator..."}
      <Modal show={$modal}>
        <button on:click={showModal}>View Generator Details</button>
      </Modal>
    {/if}

    {#if textTransformed}
      <div on:click={resetGenerator} on:keydown={resetGenerator} role="button" tabindex=0><img src={resetIcon} alt="reset icon button" class="reset-button"/></div>
    {/if}
  </div>

  <div class="question-mark" on:click={() => userAccepted.reset()} on:keydown={() => userAccepted.reset()} role="button" tabindex=0>
    <img src={questionIcon} alt="question mark icon button" class="question-button"/>
  </div>
</div>

<style>
  .selection-row {
    display: grid;
    grid-template-columns: 2fr 5fr 1fr;
    align-items: center;
    width: 100%;
    margin-top: 1.5rem;
  }

  .question-mark {
    display: flex;
    justify-self: flex-end;
    margin-right: 1.5rem;
  }

  .question-button {
    display: flex;
    justify-self: flex-end;
  }

  .reset-button {
    display: flex;
  }

  .input-type-selection {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    margin-bottom: inherit;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .generator-selection {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

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

