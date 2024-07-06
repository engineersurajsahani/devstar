<script>
    import { onMount } from 'svelte';
    import FontDisplay from './FontDisplay.svelte';
  
    let fonts = [];
    let selectedFont1 = '';
    let selectedFont2 = '';
    let customText = 'The quick brown fox jumps over the lazy dog';
    let fontSize = 20;
    let fontWeight = 400;
  
    // Fetch fonts from Google Fonts API on component mount
    onMount(async () => {
      try {
        const res = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyArv1dG2Wud8FiVTBobRz1DxVAeoedAq2Q');
        if (!res.ok) {
          throw new Error('Failed to fetch fonts');
        }
        const data = await res.json();
        fonts = data.items.map(font => font.family);
      } catch (error) {
        console.error('Error fetching fonts:', error);
      }
    });
  
    function savePairing() {
      const pairings = JSON.parse(localStorage.getItem('pairings') || '[]');
      pairings.push({
        font1: selectedFont1,
        font2: selectedFont2,
        text: customText,
        size: fontSize,
        weight: fontWeight
      });
      localStorage.setItem('pairings', JSON.stringify(pairings));
    }
  
    function loadFont(font) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@${fontWeight}&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  
    $: if (selectedFont1) loadFont(selectedFont1);
    $: if (selectedFont2) loadFont(selectedFont2);
  </script>
  
  <!-- HTML structure for settings panel and font display -->
  <div class="settings-panel">
    <h2>Customize Font Pairing</h2>
    <label for="font1">Font 1:</label>
    <select bind:value={selectedFont1} id="font1">
      {#each fonts as font}
        <option value={font}>{font}</option>
      {/each}
    </select>
  
    <label for="font2">Font 2:</label>
    <select bind:value={selectedFont2} id="font2">
      {#each fonts as font}
        <option value={font}>{font}</option>
      {/each}
    </select>
  
    <label for="customText">Custom Text:</label>
    <textarea bind:value={customText} id="customText"></textarea>
  
    <label for="fontSize">Font Size:</label>
    <input type="number" bind:value={fontSize} id="fontSize" min="8" max="72" />
  
    <label for="fontWeight">Font Weight:</label>
    <input type="number" bind:value={fontWeight} id="fontWeight" min="100" max="900" step="100" />
  
    <button on:click={savePairing}>Save Pairing</button>
  </div>
  
  <FontDisplay class="font-display">
    <p style="font-family: {selectedFont1}; font-size: {fontSize}px; font-weight: {fontWeight};">
      {customText}
    </p>
    <p style="font-family: {selectedFont2}; font-size: {fontSize}px; font-weight: {fontWeight};">
      {customText}
    </p>
  </FontDisplay>
  
  <style>
    .settings-panel {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    h2 {
      margin-bottom: 15px;
      font-size: 1.5em;
      color: #333;
    }
    label {
      display: block;
      margin: 10px 0 5px;
      font-weight: bold;
    }
    select, textarea, input {
      display: block;
      width: 100%;
      margin-bottom: 10px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    textarea {
      height: 60px;
      resize: none;
    }
    button {
      display: inline-block;
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
    }
    button:hover {
      background-color: #0056b3;
    }
    .font-display {
      margin-top: 20px;
    }
    .font-display p {
      margin: 10px 0;
    }
  </style>