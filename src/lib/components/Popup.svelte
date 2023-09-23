<script>
	import { generatorInfo } from '$stores/generator_info.js';
  import { onMount } from 'svelte';
  import { generators } from '$utils/generators.js';

  const infoToDisplay = $$props['infoToDisplay'];

  const loadInfo = async () => {
    try {
      const url = `rails_generators/${infoToDisplay}.txt`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the text file.');
      }
      const text = await response.text();
      generatorInfo.update(text);
    } catch (error) {
      console.error('Error loading text file:', error);
    }
  };

  // override modal styles
  onMount(() => {
    loadInfo();

    const modal = document.querySelector('.wrap');
    modal.style.position = 'relative';
    modal.style.boxSizing = 'border-box';
    modal.style.height = '100%';
    modal.style.padding = '.5rem';
    modal.style.contain = 'strict';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';

    // bg
    const modalContainer = modal.parentElement;
    modalContainer.style.boxSizing = 'border-box';
    modalContainer.style.height = '100%';
    modalContainer.style.padding = '1rem;';
    modalContainer.style.margin = '0';

    // window
    const modalFrame = modal.children[0];
    modalFrame.style.flex = '1';
    modalFrame.style.padding = '0 0'
    modalFrame.style.margin = '0 0';
    modalFrame.style.height = '100%';
    modalFrame.style.width = '100%';
    modalFrame.style.display = 'flex';
    modalFrame.style.flexDirection = 'column';
    modalFrame.style.alignItems = 'center';
    modalFrame.style.justifyContent = 'space-around';
    modalFrame.style.paddingBottom = '.75rem';
    modalFrame.style.overflow = 'unset';
    modalFrame.style.backgroundColor = 'var(--bg-color)';

    const button = modalFrame.children[0];
    button.style.backgrounColor = 'var(--bg-color)';
    button.style.color = 'var(--bg-secondary)';
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'var(--text-color)';
      button.style.color = 'var(--text-color)';
    });
    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'var(--bg-color)';
      button.style.color = 'var(--text-color)';
    });

    // content
    const modalContent = modalFrame.children[1];
    modalContent.style.boxSizing = 'border-box';
    modalContent.contain = 'strict';
    modalContent.style.height = '100%';
    modalContent.style.width = '100%';
    modalContent.style.fontSize = '.75rem'
    modalContent.style.overflow = 'unset';


    modal.scrollTop = modal.scrollHeight;
  });
</script>

<pre class="generator-help">
  {#if $generatorInfo}
    {@html $generatorInfo}
  {/if}
</pre>

<style>
  .generator-help {
    background-color: var(--bg-color-secondary);
    color: var(--text-color);
    box-sizing: border-box;
    padding: 10px;
    contain: content;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-wrap: break-word;
    align-items: center;
    text-wrap: wrap;
    height: 100%;
    width: 100%;
    font-family: monospace;
  }

  .wrap {

  }
</style>
