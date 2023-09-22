<script>
  import { userText } from '$stores/text.js';

  function handlePaste(event) {
    userText.transform();

    let container = event.target;
    container.style.height = '20svh';
  }
</script>

<div class="input-container">
  <textarea class="input-text" on:paste={handlePaste} placeholder="Paste your SQL here" ></textarea>
</div>

<style>
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 60%;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .input-text {
    display: flex;
    align-self: stretch;
    font-size: .8rem;
    font-family: monospace;
    line-height: .9rem;
    height: calc(100svh * .6);
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    resize: vertical;
    background-color: var(--bg-color-secondary);
    color: var(--text-color-secondary);
  }
</style>
