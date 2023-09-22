<script>
  import ModeToggle from "$lib/components/ModeToggle.svelte";

</script>

<nav class="navbar">
  <h3 class="site-name">Rails Generator</h3>
  <!-- <ul>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul> -->
  <ModeToggle />
</nav>

<style>
  .site-name {
    margin: 0;
  }

  .navbar {
    background-color: var(--bg-color);
    color: var(--text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }

  /* ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  } */

  li {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
    color: var(--link-color);
  }
</style>
