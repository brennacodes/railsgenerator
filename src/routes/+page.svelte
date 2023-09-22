<script>
  import { afterUpdate, getContext, onMount } from 'svelte';
  import { userText } from '$stores/text.js';
  import ghWhite from '$assets/github-mark-white.svg';
  import ghBlack from '$assets/github-mark.png';
  import TextTransformer from '$lib/TextTransformer.svelte';
  import TextCopier from '$lib/TextCopier.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

  let userAccepted = false;

  $: githubIcon = '';

  function setUserAccepted() {
    userAccepted = true;
  }

  onMount(() => {
    githubIcon = window.document.body.classList.contains("light") ? ghBlack : ghWhite ;
  });

  afterUpdate(() => {
    githubIcon = window.document.body.classList.contains("light") ? ghBlack : ghWhite ;
  });
</script>

<Navbar />

{#if userAccepted == false}
  <div class="intro">
    <h1 class="title">Rails Generator</h1>
    <p class="description">A lightweight tool to quickly and easilty generate Rails generator commands from your SQL files.</p>
    <h2 class="inner-title">How does it work?</h2>
    <p>You can use a site like <a href="https://dbdiagram.io">dbdiagram.io</a> to create and export your schema, or use an SQL file from another source.
      Copy the SQL file contents and paste them into the text area below where prompted.
      The generator commands will be generated automatically.</p>
    <h2 class="inner-title">Some notes...</h2>
    <p>Currently, this tool only generates commands for <code>resource</code> generators, and this has only been tuned to work with PostgreSQL files.
      However, stay tuned, as there are plans to add support for more genators and SQL types in the near future!</p>
    <h2 class="inner-title">Ready to get started?</h2>
    <button class="start-btn" on:click={setUserAccepted}>Click Here!</button>
  </div>
{:else}
  <TextTransformer />

  {#if $userText != ''}
    <TextCopier />
  {/if}
{/if}

<div class="footer">
  <a class="icon-link" href="www.github.com/brennacodes" target="_blank">
    <div id="github-logo" alt="GitHub Logo" width="20" height="20" style="background-image: var(--gh-icon);"/>
  </a>
</div>

<style>
  .intro {
    height: 100%;
    padding: 20px;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
		background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }

  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 2rem;
    text-align: center;
		background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }

  .description {
    text-align: center;
    line-height: 1.5;
    font-size: 1.5rem;
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }

  .inner-title {
    margin: 0;
    line-height: 1.15;
    font-size: 1.5rem;
    text-align: center;
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }

  .start-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid var(--text-color);
    background-color: var(--bg-color);
    color: var(--text-color);
    font-size: 1.2rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .start-btn:hover {
    background-color: var(--text-color);
    color: var(--bg-color);
  }

  .footer {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 5vh;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 1.5rem 1.5rem;
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }

  .icon-link {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }

  #github-logo {
    position: absolute;
    background-image: var(--gh-icon);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 20px;
    height: 20px;
    z-index: 2;
  }

	:root {
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    font-family: "Inclusive Sans", "Helvetica Neue", Arial, sans-serif;
	}

	:global(body.dark) {
		--bg-color: #19191c;
		--bg-color-secondary: #202024;
		--text-color: #bcbdb6;
		--text-color-secondary: #cecfca;
    --link-color: #3a6568;
    --gh-icon: url('./src/assets/github-mark-white.svg');
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
	}

	:global(body.light) {
    --bg-color: #e9e9e9;
		--bg-color-secondary: #d3d2d2;
		--text-color: #1f1f1f;
		--text-color-seoncdary: #0f0f0f;
		--link-color: rgb(68, 114, 187);
    --gh-icon: url('./src/assets/github-mark.png');
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
	}

  :global(body) {
		background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
    box-sizing: border-box;
    contain: strict;
    margin: 0px;
    width: 100svw !important;
    height: 100svh !important;
  }

  :global(head) {
		background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }

  :global(html) {
		background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
  }
</style>
