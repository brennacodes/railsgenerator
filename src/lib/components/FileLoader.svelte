<script>
  import { generators } from '$utils/generators.js';
  import { fileContents } from '$stores/file_contents.js';

  import FileContents from '$lib/components/FileContents.svelte';

  let selectedOption = '';

  async function loadFileContents() {
    if (!selectedOption) return;

    const group = document.getElementById(selectedOption).classList[0];

    try {
      const response = await fetch(`./rails_generators/${group.toLowerCase()}_${selectedOption}.txt`);
      let content = await response.text();
      fileContents.update(content);
    } catch (error) {
      console.error('Error loading file:', error);
    }
  }
</script>

<select bind:value={selectedOption} on:change={loadFileContents}>
  <option value="">Select a generator</option>

  {#each Object.keys(generators) as group}
    <optgroup label={group}>
      {#each generators[group] as option}
        <option value={option} class={group} id={option}>{option}</option>
      {/each}
    </optgroup>
  {/each}
</select>

<FileContents />

