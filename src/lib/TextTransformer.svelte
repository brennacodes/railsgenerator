<script>
  import { createEventDispatcher } from 'svelte';
  import { pasteToGenerate } from '$lib/utils/transformer.js';
  import { userText } from '$stores/text.js';
  let inputText = '';

  $userText = inputText;

</script>

<div>
  <textarea class="input-text" bind:value={inputText} on:paste={pasteToGenerate} placeholder="Paste your text here" ></textarea>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 60%;
  }

  .input-text {
    display: flex;
    align-self: stretch;
    font-size: .8rem;
    font-family: monospace;
    line-height: .9rem;
    height: calc(100svh * .6);
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
  }
</style>
