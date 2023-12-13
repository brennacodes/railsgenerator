<script>
  import { userText } from '$stores/text.js';
  import { generator } from '$stores/generator.js';
  import { handleInput } from '$lib/utils/transformer';
  import { transformed } from '$stores/transformed.js';
  import { inputType } from '$stores/input_type.js';

  $: pasted = $userText || '';
  $: generatorType = $generator;
  $: selectedType = $inputType;

  function handlePaste(event) {
    let selected = document.querySelector('.selector').value;
    if (selected == "Select a generator..." || selected == "") return;

    let container = event.target.parentElement;
    // container.style.height = '20svh';
    container.style.flexShrink = '1';

    setTimeout(() => {
      const textarea = document.querySelector('.input-text')
      textarea.scrollTop = 0;

      userText.update(pasted)
      handleInput(pasted, generatorType);
      transformed.true();
    }, 100);
  }
</script>

<div class="input-container">
  <textarea name="input-text" class="input-text" on:paste={handlePaste} placeholder="Paste your {selectedType} here" bind:value={pasted}></textarea>
</div>

<style>
  .input-container {
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    width: 100%;
    background-color: var(--bg-color);
    color: var(--text-color);
    height: auto;
    flex-grow: 1;
  }

  .input-text {
    display: flex;
    flex-grow: 1;
    align-self: stretch;
    flex-direction: column;
    font-size: .8rem;
    font-family: monospace;
    line-height: .9rem;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    resize: vertical;
    background-color: var(--bg-color-secondary);
    color: var(--text-color-secondary);
  }
</style>
