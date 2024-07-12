<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    let colorStops = [
      { color: '#ff0000', position: 0 },
      { color: '#0000ff', position: 100 }
    ];
    let angle = 90;
    let text = 'Your Gradient Text';
    let fontSize = 24;
    let fontType = 'Arial, sans-serif';
    let fontColor = '#fff';
  
    const gradientCSS = writable('');
  
    function updateGradient() {
      const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
      const gradient = `linear-gradient(${angle}deg, ${stops})`;
      gradientCSS.set(gradient);
    }
  
    function addColorStop() {
      colorStops.push({ color: '#ffffff', position: 50 });
      updateGradient();
    }
  
    function removeColorStop(index) {
      colorStops.splice(index, 1);
      updateGradient();
    }
  
    function copyToClipboard() {
      gradientCSS.subscribe(gradient => {
        navigator.clipboard.writeText(`background: ${gradient};`).then(() => {
          alert('Gradient CSS copied to clipboard!');
        });
      });
    }
  
    onMount(() => {
      updateGradient();
    });
  
    $: updateGradient();
  </script>
  
  <div class="container">
    <h1>Text Gradient Generator</h1>
  
    <div class="preview" style="background: {$gradientCSS}; font-size: {fontSize}px; font-family: {fontType}; color: {fontColor};">
      {text}
    </div>
  
    <div class="controls">
      <label>Text: <input type="text" bind:value={text}></label>
      <label>Font Size: <input type="number" bind:value={fontSize} min="1"></label>
      <label>Font Type:
        <select bind:value={fontType}>
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="'Georgia', serif">Georgia</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Verdana', sans-serif">Verdana</option>
        </select>
      </label>
      <label>Font Color: <input type="color" bind:value={fontColor}></label>
      <label>Angle: <input type="number" bind:value={angle} min="0" max="360"></label>
  
      {#each colorStops as stop, index}
        <div class="color-stop">
          <label>Color {index + 1}: <input type="color" bind:value={stop.color}></label>
          <label>Position: <input type="number" bind:value={stop.position} min="0" max="100"></label>
          <button on:click={() => removeColorStop(index)}>Remove</button>
        </div>
      {/each}
  
      <button on:click={addColorStop}>Add Color Stop</button>
      <button on:click={copyToClipboard}>Copy Gradient CSS</button>
    </div>
  
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
  
    .preview {
      padding: 20px;
      margin-bottom: 20px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    .controls {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
  
    .controls label {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #000;
    }
  
    .controls input,
    .controls select {
      padding: 5px;
      border-radius: 3px;
      border: 1px solid #ccc;
      background-color: #fff;
    }
  
    .controls input[type="color"] {
      padding: 0;
    }
  
    .color-stop {
      display: flex;
      gap: 10px;
      align-items: center;
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
  
    @media (prefers-color-scheme: dark) {
      .container {
        color: #fff;
      }
  
      .preview {
        border-color: #444;
      }
  
      .controls label {
        color: #fff;
      }
  
      .controls input,
      .controls select {
        background-color: #333;
        color: #fff;
        border: 1px solid #555;
      }
  
      .css-code {
        background-color: #333;
        color: #fff;
      }
    }
  </style>