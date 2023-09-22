<script>
  import { userText } from '$stores/text.js';

  import TextTransformer from '$lib/TextTransformer.svelte';
  import TextCopier from '$lib/TextCopier.svelte';

  $: copyableText = $userText;

</script>

<TextTransformer />

{#if $userText !== undefined}
  <TextCopier />
{/if}
