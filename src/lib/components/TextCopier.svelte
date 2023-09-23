<script>
	import { tooltip } from '$lib/utils/tooltip.js';
	import { onMount, afterUpdate } from "svelte";
  import { userText } from '$stores/text.js';
  import clipboardy from 'clipboardy';

  $: textToCopy = $userText;

  function copyText(event) {
    let text = event.target.value;
    clipboardy.write(text);
  }

  $: topPosition = 0;
  $: leftPosition = 0;

  function isElementOutOfBounds(x, y) {
    let tooltip = document.querySelector('.tooltip')
    let doc = document.documentElement.getBoundingClientRect();
    let footerHeight = document.querySelector('.footer').getBoundingClientRect().height;
    const rect = tooltip.getBoundingClientRect();

    const bounds = [
      y + rect.height < 0, // too high
      x + rect.width < 0,  // too far left
      y + rect.height > doc.height - footerHeight - rect.height,  // too low
      x + rect.width > doc.width - rect.width  // too far right
    ];

    return bounds;
  }

  function calculatePosition(x, y) {
    let tooltip = document.querySelector('.tooltip').getBoundingClientRect();
    let nav = document.querySelector('.navbar').getBoundingClientRect().height;
    let footer = document.querySelector('.footer').getBoundingClientRect().height;
    let doc = document.documentElement.getBoundingClientRect();
    const outOfBounds = isElementOutOfBounds(x, y);

    topPosition = y - tooltip.height - 10;
    leftPosition = x + 10;

    if(outOfBounds.includes(true)) {
      if (outOfBounds[0]) {
        topPosition = y + nav + tooltip.height + 10;
      }
      if (outOfBounds[1]) {
        leftPosition = x + tooltip.width + 10;
      }
      if (outOfBounds[2]) {
        topPosition = y - (tooltip.height + footer + 10);
      }
      if (outOfBounds[3]) {
        leftPosition = x - (tooltip.width + 10);
      }
    }
  }

  function handleMouseMove(event) {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.visibility = 'visible';

    calculatePosition(event.clientX, event.clientY);
  }

  function handleTooltip(event) {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.zIndex = 2;
    tooltip.style.visibility = 'visible';
  }

  function handleMouseAway(event) {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.visibility = 'collapse';
    topPosition = 0;
    leftPosition = 0;
  }

  onMount(() => {
    let tooltip = document.querySelector('.tooltip');
    tooltip.style.visibility = 'collapse';
  });

  afterUpdate(() => {
    // copiedText = textToCopy.split('\n');
    // document.querySelector('.copy-text-container').style.height = '70svh';
  });
</script>

<div class="copy-text-container">
  <div class="tooltip" data-tooltip="Click to copy!" visiblity="collapse" style="top: {topPosition}px; left: {leftPosition}px;">Click to Copy!</div>
  {#each textToCopy as line}

    <textarea name="copy-text" class="copy-area" bind:value={line} on:hover={handleTooltip} on:mousemove={handleMouseMove} on:mouseleave={handleMouseAway} on:click={copyText} alt="Click to Copy" readonly=true></textarea>
  {/each}
</div>

<style>
  .copy-text-container {
    background-color: var(--bg-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex: 1;
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
    flex-grow: 1;
    font-size: .8rem;
    font-family: monospace;
    line-height: .9rem;
    margin: .5rem 20px ;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    resize: vertical;
    background-color: var(--bg-color-secondary);
    color: var(--text-color-secondary);
  }
</style>
