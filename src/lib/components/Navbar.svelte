<script>
  import ModeToggle from "$lib/components/ModeToggle.svelte";
  import { userAccepted } from '$stores/user_accepted.js';
</script>

<nav class="navbar">
  <h3 class="site-name"><a on:click={() => userAccepted.reset()} href="">Rails Generator</a></h3>
  <ModeToggle />
</nav>

<style>
  a {
    color: var(--text-color);
    text-decoration: none;
  }

  .site-name {
    margin: 0;
  }

  .navbar {
    position: relative;
    background-color: var(--bg-color);
    color: var(--text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 8vh;
    padding: 10px 20px;
    box-shadow: 0px -12px 15px 5px rgba(0, 0, 0, 1);
    z-index: 10;
  }
</style>
