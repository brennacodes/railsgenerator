<script>
  import '$src/app.css';
  import Modal, { bind } from 'svelte-simple-modal';
  import { afterUpdate, getContext, onMount, setContext } from 'svelte';
  import { generator } from "$stores/generator.js";
  import { userText } from '$stores/text.js';
  import { userAccepted } from '$stores/user_accepted.js';
  import { writable } from 'svelte/store';

  import ghWhite from '$images/github-mark-white.svg';
  import ghBlack from '$images/github-mark.png';
  import dbml from '$images/DBML.png';
  import sql from '$images/sql_exports.png';

  import Navbar from '$components/Navbar.svelte';
  import Footer from '$components/Footer.svelte';
	import FileLoader from '$components/FileLoader.svelte';
  import TextTransformer from '$components/TextTransformer.svelte';
  import TextCopier from '$components/TextCopier.svelte';

  const modal = writable(null);

  $: githubIcon = '';
  $: accepted = $userAccepted;

  function setUserAccepted() {
    userAccepted.true();
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
{#if accepted == false}
  <div class="intro" modal=true role=dialog>
    <h1 class="title">Rails Generator</h1>
    <p class="description">A blazing-fast tool to easily generate Rails generator commands from your SQL files.</p>
    <h2 class="inner-title">How does it work?</h2>
    <p class="notes">You can use a site like <a href="https://dbdiagram.io">dbdiagram.io</a> to create and export your schema, or use an SQL file from another source.
      Copy the SQL file contents and paste them into the text area where prompted.
      If you're using <span class="db-diagram">dbdiagram.io</span>, you can find the export button at the top middle of the screen. You can also copy/paste the DBML code directly into the text area.
      <span class="figures">
        <figure alt="DBML code">
          <img src={dbml} alt="DBML export button" class="dbml-img">
          <figcaption>DBML example</figcaption>
        </figure>
        <figure alt="SQL exports">
          <img src={sql} alt="SQL export options" class="sql-img">
          <figcaption>SQL Export Options</figcaption>
        </figure>
      </span>

      Your sparkling new generator commands will appear like magic.
    </p>
    <h2 class="inner-title">Some notes...</h2>
    <div class="notes">
      Currently, this tool only generates commands for generators that use the format <code>|some_lowercase_model_name| |field_name:field_type|</code>(so it's not the best for things like controllers...yet), and it has only been tuned to work with PostgreSQL sql and DDL from Postico.
      <br><small class=note><em>However... stay tuned, as there are plans to add reliable for more genators and SQL types in the near future!</em></small>
    </div>

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
  .figures {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
  }
  figure {
    box-sizing: border-box;
    contain: content;
    width: fit-content;
    border: thin #c0c0c0 solid;
    display: flex;
    flex-flow: column;
    padding: 5px;
  }

  .sql-img {
    width: auto;
    max-height: 30vh;
  }

  .dbml-img {
    width: auto;
    max-height: 30vh;
  }

  figcaption {
    background-color: #52525283;
    color: #fff;
    font: italic smaller sans-serif;
    padding: 3px;
    text-align: center;
  }
  h1 {
    background: none;
  }

  a {
    color: var(--link-color);
  }

  .intro {
    height: 80% !important;
    width: 70% !important;
    padding: 1rem;
    font-size: 1rem;
    box-sizing: border-box;
    contain: strict;
    overflow-y: scroll;
    position: relative;
    top: 10%;
    background: #d6d6d629;
    display: flex;
    flex-direction: column;
    border-radius: .5rem;
    border: 1px solid black;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
  }

  .notes {
    padding: 1.5rem;
  }

  code {
    background-color: var(--bg-color-secondary);
    color: red;
  }

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

  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 2rem;
    text-align: center;
		color: var(--text-color) !important;
  }

  .description {
    text-align: center;
    line-height: 1.5;
    font-size: 1.5rem;
    margin: 1rem 4rem 2rem 4rem;
		color: var(--text-color) !important;
  }

  .inner-title {
    margin: 0;
    line-height: 1.15;
    font-size: 1.5rem;
    text-align: center;
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
