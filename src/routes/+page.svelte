<script>
  // impart app.css
  import '$src/app.css';
  import { afterUpdate, getContext, onMount } from 'svelte';
  import { generator } from "$stores/generator.js";
  import { userText } from '$stores/text.js';

  import ghWhite from '$images/github-mark-white.svg';
  import ghBlack from '$images/github-mark.png';

  import Navbar from '$components/Navbar.svelte';
  import Footer from '$components/Footer.svelte';
	import FileLoader from '$components/FileLoader.svelte';
  import TextTransformer from '$components/TextTransformer.svelte';
  import TextCopier from '$components/TextCopier.svelte';

  let userAccepted = false;

  $: githubIcon = '';

  function setUserAccepted() {
    userAccepted = true;
  }

  function handleSelection(event) {
    generator.update(event.detail);
  }

  onMount(() => {
    githubIcon = window.document.body.classList.contains("light") ? ghBlack : ghWhite ;
  });

  afterUpdate(() => {
    githubIcon = window.document.body.classList.contains("light") ? ghBlack : ghWhite ;
  });
</script>

<Navbar />

<div class="main-container">
{#if userAccepted == false}
  <div class="intro">
    <h1 class="title">Rails Generator</h1>
    <p class="description">A blazing-fast tool to easily generate Rails generator commands from your SQL files.</p>
    <h2 class="inner-title">How does it work?</h2>
    <p>You can use a site like <a href="https://dbdiagram.io">dbdiagram.io</a> to create and export your schema, or use an SQL file from another source.
      Copy the SQL file contents and paste them into the text area where prompted.
      Your sparkling new generator commands will appear like magic.</p>
    <h2 class="inner-title">Some notes...</h2>
    <ul>
      <li>
        Currently, this tool only generates commands for <code>resource</code> generators, and this has only been tuned to work with PostgreSQL files.
      </li>
    </ul>

      <small class=note><em>However... stay tuned, as there are plans to add support for more genators and SQL types in the near future!</em></small>
    <h2 class="inner-title">Ready to get started?</h2>
    <button class="start-btn" on:click={setUserAccepted}>Click Here!</button>
  </div>
{:else}
  <FileLoader on:generatorselected={handleSelection}/>

  {#if $generator != ''}
    <TextTransformer />
  {/if}

  {#if $userText != ''}
    <TextCopier />
  {/if}
{/if}
</div>

<Footer />

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 8vh - 6vh);
    width: 100%;
    box-sizing: border-box;
    contain: strict;
    background-color: var(--bg-color) !important;
    color: var(--text-color) !important;
  }

  .note {
    text-align: center;
    margin-bottom: 2rem;
  }
  .intro {
    height: 100%;
    padding: 2rem;
    font-size: 1rem;
    box-sizing: border-box;
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
    margin: 1rem 4rem 2rem 4rem;
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
    font-family: "Nunito", "Helvetica Neue", Arial, sans-serif;
	}

	:global(body.dark) {
		--bg-color: #19191c;
		--bg-color-secondary: #202024;
		--text-color: #bcbdb6;
		--text-color-secondary: #cecfca;
    --link-color: #3a6568;
    --gh-icon: url('$images/github-mark-white.svg');
    background-color: var(--bg-color) !important;
		color: var(--text-color) !important;
	}

	:global(body.light) {
    --bg-color: #e9e9e9;
		--bg-color-secondary: #d3d2d2;
		--text-color: #1f1f1f;
		--text-color-seoncdary: #0f0f0f;
		--link-color: rgb(68, 114, 187);
    --gh-icon: url('$images/github-mark.png');
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
