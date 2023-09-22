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

{#if textToCopy !== undefined}
  <textarea class="copy-area" on:click={copyText} bind:value={textToCopy}></textarea>
{/if}

<style>
  .copy-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    cursor: pointer;
    border-radius: 10px;
  }

</style>
