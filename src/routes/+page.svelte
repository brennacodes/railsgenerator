<script>
  // import '$src/app.css'
  import { afterUpdate, setContext } from 'svelte';
  import { userText } from '$stores/text.js';
  import TextTransformer from '$lib/TextTransformer.svelte';
  import TextCopier from '$lib/TextCopier.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

  let tooltip = "Click to Copy";
</script>

<Navbar />
<TextTransformer />

{#if $userText !== undefined}
  <TextCopier {tooltip}/>
{/if}

<style>
	:root {
    margin: 0px;
    font-family: "Inclusive Sans", "Helvetica Neue", Arial, sans-serif;
	}

	:global(body.dark) {
		--bg-color: #19191c;
		--bg-color-secondary: #202024;
		--text-color: #bcbdb6;
		--text-color-secondary: #cecfca;
    --link-color: #3a6568;
	}

	:global(body.light) {
		--bg-color: #e9e9e9;
		--bg-color-secondary: #d3d2d2;
		--text-color: #1f1f1f;
		--text-color-seoncdary: #0f0f0f;
		--link-color: rgb(68, 114, 187);
	}

  body {
		background-color: var(--bg-color);
		color: var(--text-color);
    margin: 0px;
  }
</style>
