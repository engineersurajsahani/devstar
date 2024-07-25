<script>
  import { onMount } from 'svelte';

  let numPoints = 8;
  let randomness = 1.0;
  let path = '';
  let blobColor = '#e75480';

  function generateBlobPath() {
    const radius = 220;
    const centerX = 250;
    const centerY = 250;
    let points = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints;
      const randomRadius = radius + (Math.random() - 0.5) * randomness * 100;
      const x = centerX + Math.cos(angle) * randomRadius;
      const y = centerY + Math.sin(angle) * randomRadius;
      points.push({ x, y });
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const midX = (prevPoint.x + currentPoint.x) / 2;
      const midY = (prevPoint.y + currentPoint.y) / 2;
      path += ` Q ${prevPoint.x} ${prevPoint.y} ${midX} ${midY}`;
    }

    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const midX = (lastPoint.x + firstPoint.x) / 2;
    const midY = (lastPoint.y + firstPoint.y) / 2;
    path += ` Q ${lastPoint.x} ${lastPoint.y} ${midX} ${midY} Z`;

    return path;
  }

  $: path = generateBlobPath();

  onMount(() => {
    path = generateBlobPath();
  });

  function downloadSVG() {
    const svgElement = document.querySelector('.dotted-border-container svg');
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svgElement)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blob.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadPNG() {
    const svgElement = document.querySelector('.dotted-border-container svg');
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svgElement)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600; // Match the SVG width
      canvas.height = 600; // Match the SVG height
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'blob.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
      URL.revokeObjectURL(url);
    };
  }

  function changeBlobColor(color) {
    blobColor = color;
    path = generateBlobPath();
  }
</script>

<div class="card">
<div class="container-wrapper">
  <div class="dotted-border-container" style="position: relative;">
    <div class="color-palette top-right">
      <div class="color-group">
        <button class="color-button" style="background-color: #e75480;" on:click={() => changeBlobColor('#e75480')}></button>
        <button class="color-button" style="background-color: #4caf50;" on:click={() => changeBlobColor('#4caf50')}></button>
        <button class="color-button" style="background-color: #2196f3;" on:click={() => changeBlobColor('#2196f3')}></button>
        <button class="color-button" style="background-color: #ff9800;" on:click={() => changeBlobColor('#ff9800')}></button>
      </div>
      <div class="color-group">
        <button class="color-button" style="background-color: #9c27b0;" on:click={() => changeBlobColor('#9c27b0')}></button>
        <button class="color-button" style="background-color: #00bcd4;" on:click={() => changeBlobColor('#00bcd4')}></button>
        <button class="color-button" style="background-color: #ff5722;" on:click={() => changeBlobColor('#ff5722')}></button>
        <button class="color-button" style="background-color: #607d8b;" on:click={() => changeBlobColor('#607d8b')}></button>
      </div>
      <div class="color-group">
        <button class="color-button" style="background-color: #f44336;" on:click={() => changeBlobColor('#f44336')}></button>
        <button class="color-button" style="background-color: #673ab7;" on:click={() => changeBlobColor('#673ab7')}></button>
        <button class="color-button" style="background-color: #ffc107;" on:click={() => changeBlobColor('#ffc107')}></button>
        <button class="color-button" style="background-color: #3f51b5;" on:click={() => changeBlobColor('#3f51b5')}></button>
      </div>
      <div class="color-group">
        <button class="color-button" style="background-color: #795548;" on:click={() => changeBlobColor('#795548')}></button>
        <button class="color-button" style="background-color: #8bc34a;" on:click={() => changeBlobColor('#8bc34a')}></button>
        <button class="color-button" style="background-color: #ffeb3b;" on:click={() => changeBlobColor('#ffeb3b')}></button>
        <button class="color-button" style="background-color: #9e9e9e;" on:click={() => changeBlobColor('#9e9e9e')}></button>
      </div>
      <div class="color-group">
        <button class="color-button" style="background-color: #00e676;" on:click={() => changeBlobColor('#00e676')}></button>
        <button class="color-button" style="background-color: #ffcdd2;" on:click={() => changeBlobColor('#ffcdd2')}></button>
        <button class="color-button" style="background-color: #03a9f4;" on:click={() => changeBlobColor('#03a9f4')}></button>
      </div>
    </div>
    <svg width="600" height="600" viewBox="0 0 500 500">
      <defs>
        <filter id="dropShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="3" dy="3" result="offsetblur" />
          <feFlood flood-color="rgba(0,0,0,0.3)" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={path} fill={blobColor} filter="url(#dropShadow)" />
    </svg>
  </div>

  <div class="slider-container" style="max-width: 800px;">
    <div class="range-slider">
      <img
        src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/3angle.svg"
        alt="Decrease SVG Shape Angles"
        class="slider-icon"
      />
      <input
        class="range-slider__range range-slider-angle"
        type="range"
        bind:value={numPoints}
        min="3"
        max="12"
        step="1"
        on:input={() => path = generateBlobPath()}
      />
      <img
        src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/angles.svg"
        alt="Increase SVG Shape Angles"
        class="slider-icon"
      />
    </div>

    <div class="range-slider">
      <img
        src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/circle.svg"
        alt="Decrease SVG Shape Complexity"
        class="slider-icon"
      />
      <input
        class="range-slider__range range-slider-curve"
        type="range"
        bind:value={randomness}
        min="0.1"
        max="2.0"
        step="0.1"
        on:input={() => path = generateBlobPath()}
      />
      <img
        src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/circle-end.svg"
        alt="Increase SVG Shape Complexity"
        class="slider-icon"
      />
    </div>

    <div class="button-wrapper">
        <button class="button" on:click={() => path = generateBlobPath()}>Randomize</button>
        <button class="button" on:click={downloadPNG}>PNG</button>
        <button class="button" on:click={downloadSVG}>SVG</button>
    </div>
  </div>
</div>
</div>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}

.dotted-border-container {
  width: 100%;
  max-width: 800px;
  height: 500px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 4px dotted #999;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  overflow: auto;
}

.color-palette {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
}

.color-group {
  display: flex;
  flex-wrap: wrap;
}

.color-button {
  width: 30px;
  height: 30px;
  border: none;
  margin: 5px;
  cursor: pointer;
}

.slider-container {
  width: 100%;
  max-width: 800px;
  height: 200px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 2px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.range-slider {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.range-slider img {
  width: 40px;
  height: 40px;
}

.range-slider__range {
  width: 70%;
  -webkit-appearance: none;
  margin: 0 10px;
  height: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.15s ease-in-out;
}

.range-slider__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #4caf50;
  cursor: pointer;
  border-radius: 50%;
}

.range-slider__range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #4caf50;
  cursor: pointer;
  border-radius: 50%;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button {
  background-color: #4caf50;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 30px;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}
</style>