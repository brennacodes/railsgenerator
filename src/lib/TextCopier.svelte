<script>
	import { afterUpdate } from "svelte";
  import { userText } from '$stores/text.js';
  import clipboardy from 'clipboardy';

  let copiedText = '';

  $: textToCopy = $userText;

  function copyText(event) {
    let text = event.target.value;
    clipboardy.write(text);
  }

  afterUpdate(() => {
    copiedText = textToCopy;
  });
</script>

<div>
  {#if textToCopy !== undefined}
    <textarea class="copy-area" on:click={copyText} bind:value={textToCopy}></textarea>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 60%;
  }

  .copy-area {
    display: flex;
    align-self: stretch;
    height: auto;
    margin: 20px;
    border-radius: 10px;
    cursor: pointer;
  }

</style>
