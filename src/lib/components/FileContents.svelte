<script>
  import { generatorInfo } from '$stores/generator_info.js';

  $: contents = $generatorInfo;
</script>


{#if contents}
  <pre class="generator-help">{@html contents}</pre>
{/if}

<style>
  .generator-help {
    background-color: var(--bg-color);
    color: var(--text-color);
    box-sizing: border-box;
    padding: 10px;
    contain: content;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-wrap: wrap;
    height: 70svh;
    font-family: monospace;
  }
</style>
