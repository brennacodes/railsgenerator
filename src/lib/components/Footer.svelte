<script>
  import { afterUpdate } from 'svelte';
  import ghWhite from '$images/github-mark-white.svg';
  import ghBlack from '$images/github-mark.png';

  $: githubIcon = '';

  afterUpdate(() => {
    githubIcon = document.body.classList.contains("light") ? ghBlack : ghWhite ;
  });
</script>


<div class="footer">
  <a class="icon-link" href="www.github.com/brennacodes" target="_blank">
    <img id="github-logo" src={githubIcon} alt="GitHub Logo" width="20" height="20"/>
  </a>
</div>

<style>
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 6vh;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    box-shadow: 0px 12px 15px 5px rgba(0, 0, 0, 1);
    background-color: var(--bg-color) !important;
  }

  .icon-link {
    box-sizing: border-box;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-color) !important;
    color: var(--text-color) !important;
  }

  #github-logo {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 20px;
    height: 20px;
  }
</style>