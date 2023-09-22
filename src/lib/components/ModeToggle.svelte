<script>
	import { onMount, setContext } from "svelte";

  $: colorScheme = "light";
  let moon = "https://img.icons8.com/sf-black-filled/64/moon-symbol.png";
  let moonAlt = "moon symbol";
  let sun = "https://img.icons8.com/external-flat-papa-vector/78/external-Light-Mode-interface-flat-papa-vector.png";
  let sunAlt = "sun symbol";

  $: src = colorScheme == "light" ? moon : sun;
  $: alt = colorScheme == "light" ? moonAlt : sunAlt;

  onMount(() => {
    window.document.body.classList.contains(colorScheme) ? null : window.document.body.classList.add(colorScheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        window.document.body.classList = "";
        colorScheme = event.matches ? "dark" : "light";
        window.document.body.classList.add(colorScheme);
    });
  });

	function toggle() {
    if (window.document.body.classList.contains('light')) {
        window.document.body.classList.remove('light');
        window.document.body.classList.add('dark');
        colorScheme = "dark";
    } else {
        window.document.body.classList.remove('dark');
        window.document.body.classList.add('light');
        colorScheme = "light";
    }
  };

  setContext('colorScheme', colorScheme);
</script>

<img width="30" height="30" {src} {alt} on:click={toggle} class="mode-toggle"/>

<style>
	.mode-toggle {
		background: var(--bg-color);
		color: var(--text-color);
	}

	.mode-toggle:active {
		background: inherit;
	}
</style>
