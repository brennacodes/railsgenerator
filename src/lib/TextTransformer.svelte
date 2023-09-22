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
    margin: 20px;
  }

  .input-text {
    width: 100%;
    height: min(40%, 40vh);
    resize: vertical;
    overflow: scroll;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
