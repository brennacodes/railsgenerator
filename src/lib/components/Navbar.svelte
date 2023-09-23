<script>
  import ModeToggle from "$lib/components/ModeToggle.svelte";
</script>

<nav class="navbar">
  <h3 class="site-name">Rails Generator</h3>
  <ModeToggle />
</nav>

<style>
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
