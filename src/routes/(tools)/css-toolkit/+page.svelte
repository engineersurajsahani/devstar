<script>
  import TextGradient from './TextGradient.svelte';
  import BoxShadow from './BoxShadow.svelte';
  import HoverEffect from './HoverEffect.svelte';
 

  let currentTool = 'TextGradient';
</script>

<style>
  .container {
    display: flex;
    height: auto;
    /* height: 100vh; */
  }

  .sidebar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 20px;
  }

  .content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }

  .sidebar button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    text-align: left;
  }

  .sidebar button.active {
    background-color: #0056b3;
  }
</style>

<div class="container">
  <div class="sidebar">
    <button class:active={currentTool === 'TextGradient'} on:click={() => currentTool = 'TextGradient'}>
      CSS Text Gradient Generator
    </button>
    <button class:active={currentTool === 'BoxShadow'} on:click={() => currentTool = 'BoxShadow'}>
      CSS Box Shadow Generator
    </button>
    <button class:active={currentTool === 'HoverEffect'} on:click={() => currentTool = 'HoverEffect'}>
      CSS Hover Effect Generator
    </button>
  
  </div>

  <div class="content">
    {#if currentTool === 'TextGradient'}
      <TextGradient />
    {:else if currentTool === 'BoxShadow'}
      <BoxShadow />
    {:else if currentTool === 'HoverEffect'}
      <HoverEffect />
    {/if}
  </div>
</div>
