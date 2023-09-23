<script>
	import { onMount, afterUpdate } from "svelte";
  import { userText } from '$stores/text.js';
  import clipboardy from 'clipboardy';

  let copiedText = '';

  $: textToCopy = $userText;

  function copyText(event) {
    let text = event.target.value;
    clipboardy.write(text);
  }

  $: topPosition = 0;
  $: leftPosition = 0;

  function handleMouseMove(event) {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.visibility = 'visible';
    topPosition = event.clientY;
    leftPosition = event.clientX;
  }

  function handleTooltip(event) {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.zIndex = 2;
    tooltip.style.visibility = 'visible';
  }

  function handleMouseAway(event) {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.visibility = 'collapse';
  }

  onMount(() => {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.visibility = 'collapse';
  });

  afterUpdate(() => {
    copiedText = textToCopy;
    document.querySelector('.copy-text-container').style.height = '70svh';
  });
</script>

<div class="copy-text-container">
  <div class="tooltip" data-tooltip="Click to copy!" visiblity="collapse" style="top: {topPosition + 5}px; left: {leftPosition + 5}px;">Click to Copy!</div>
  <textarea name="copy-text" class="copy-area" bind:value={textToCopy} on:hover={handleTooltip} on:mousemove={handleMouseMove} on:mouseleave={handleMouseAway} on:click={copyText} alt="Click to Copy" readonly=true></textarea>
</div>

<style>
  .copy-text-container {
    background-color: var(--bg-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 70svh;
  }

  .tooltip {
    position: fixed;
    z-index: 2;
    display: flex;
    width: auto;
    height: 2.5rem;
    border-radius: 6px;
    background-color: var(--text-color);
    color: var(--bg-color);
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
    font-family: system-ui;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }

  .copy-area {
    display: flex;
    align-self: stretch;
    font-size: .8rem;
    font-family: monospace;
    line-height: .9rem;
    height: 100%;
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    resize: vertical;
    background-color: var(--bg-color-secondary);
    color: var(--text-color-secondary);
  }
</style>
