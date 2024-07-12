<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let color1 = '#ff0000';
  let color2 = '#0000ff';
  let angle = 90;

  // Create a writable store for gradient CSS
  const gradientCSS = writable('');

  // Function to update gradient based on color1, color2, and angle
  function updateGradient() {
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    gradientCSS.set(gradient); // Update the store with new gradient value
  }

  // Function to copy gradient CSS to clipboard
  function copyToClipboard() {
    gradientCSS.subscribe(gradient => {
      navigator.clipboard.writeText(gradient).then(() => {
        alert('Gradient CSS copied to clipboard!');
      });
    });
  }

  // Initialize gradient update on mount and reactivity on changes
  onMount(() => {
    updateGradient(); // Initial update
  });

  // Reactive statement to update gradient whenever color1, color2, or angle changes
  $: {
    updateGradient();
  }
</script>

<div class="container">
  <h1>Text Gradient Generator</h1>

  <!-- Display the gradient text -->
  <div class="gradient-text">
    <p class="text">Your Gradient Text</p>
  </div>

  <!-- Controls for color and angle -->
  <div class="controls">
    <label>Color 1: <input type="color" bind:value={color1}></label>
    <label>Color 2: <input type="color" bind:value={color2}></label>
    <label>Angle: <input type="number" bind:value={angle} min="0" max="360"></label>
    <button on:click={copyToClipboard}>Copy Gradient CSS</button>
  </div>

  <!-- Display generated CSS -->
  <div class="css-code">
    <pre>{`background: ${$gradientCSS};`}</pre>
  </div>
</div>
<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .text {
    color: #fff; 
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .controls label {
    font-size: 16px;
  }

  .controls input {
    margin-left: 10px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  .css-code {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
