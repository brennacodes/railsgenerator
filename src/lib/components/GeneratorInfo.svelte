<script>
  import { afterUpdate } from 'svelte';
  import { generatorInfo } from '$stores/generatorInfo.js';

  export let infoToDisplay; // dynamic module name
  let info;

  const reader = new FileReader();

  afterUpdate() {
    try {
      info = await import(`$rails_generators/${infoToDisplay}.txt`);
    } catch (error) {
      console.error('Error loading module:', error);
    }
  }
</script>

{#if info}
  <svelte:component this={info.default} >
    {@html generatorInfo.load(reader, info.default)}
  </svelte:component>
{/if}
