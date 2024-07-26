<script>
  import { writable } from 'svelte/store';

  let color = '#FF0066';
  let svgShape = 'M150 0 L75 200 L225 200 Z'; 
  const shapes = writable([]);
  let selectedShapeIndex = null;
  let size = 100; 
  let rotation = 0; 
  let showDownloadOptions = false; 

  let dragState = {
    isDragging: false,
    isResizing: false,
    startX: 0,
    startY: 0,
    shapeIndex: null
  };

  function generateRandomPath(points) {
    if (points.length < 2) return ''; 

    let path = `M${points[0].x},${points[0].y} `;
    for (let i = 1; i < points.length; i++) {
      path += `L${points[i].x},${points[i].y} `;
    }
    path += 'Z'; 
    return path;
  }

  function generateBlobPath() {
    const numPoints = 8; 
    const radius = 100; 
    const variance = 40; 

    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * (2 * Math.PI);
      const distance = radius + (Math.random() - 0.5) * variance;
      const x = 250 + Math.cos(angle) * distance;
      const y = 250 + Math.sin(angle) * distance;
      points.push({ x, y });
    }

    return generateCatmullRomPath(points);
  }

  function generateCatmullRomPath(points) {
    if (points.length < 2) return ''; 

    const path = [];
    path.push(`M${points[0].x},${points[0].y}`);

    for (let i = 0; i < points.length; i++) {
      const p0 = points[i];
      const p1 = points[(i + 1) % points.length];
      const p2 = points[(i + 2) % points.length];
      const p3 = points[(i + 3) % points.length];

      for (let t = 0; t <= 1; t += 0.1) {
        const x = 0.5 * (
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t * t * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t * t +
          (-p0.x + p2.x) * t +
          2 * p1.x
        );

        const y = 0.5 * (
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t * t * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t * t +
          (-p0.y + p2.y) * t +
          2 * p1.y
        );

        path.push(`L${x},${y}`);
      }
    }

    path.push('Z'); 
    return path.join(' ');
  }

  function addShape() {
    const shapeToAdd = svgShape === 'Blob' ? generateBlobPath() : svgShape;

    shapes.update(items => [
      ...items,
      { id: items.length, path: shapeToAdd, color, x: 0, y: 0, width: size, height: size, rotation: 0 }
    ]);
  }

  function deleteShape() {
    shapes.update(items => items.slice(0, -1));
  }

  function onSizeChange(event) {
    const newSize = Number(event.target.value);
    if (selectedShapeIndex !== null) {
      shapes.update(items => {
        const updatedItems = [...items];
        const shape = updatedItems[selectedShapeIndex];
        shape.width = newSize;
        shape.height = newSize;
        return updatedItems;
      });
    }
  }

  function updateColorPreview(event) {
    const previewElement = event.target.nextElementSibling;
    previewElement.style.backgroundColor = event.target.value;
  }

  function triggerColorInput(event) {
    const inputElement = event.target.previousElementSibling;
    inputElement.click();
  }

  function downloadSVG() {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
        ${$shapes.map(shape => `
          <path d="${shape.path}" fill="${shape.color}" stroke="none" transform="translate(${shape.x},${shape.y}) scale(${shape.width / 100},${shape.height / 100})" />
        `).join('')}
      </svg>
    `;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shape.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadPNG() {
    const svgElement = document.querySelector('.shape-preview svg');
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL('image/png');

      const a = document.createElement('a');
      a.href = png;
      a.download = 'shape.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  }

  function startDrag(event, index) {
    dragState.isDragging = true;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
    dragState.shapeIndex = index;
    selectedShapeIndex = index;
    size = $shapes[index].width; 
  }

  function startResize(event, index) {
    dragState.isResizing = true;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
    dragState.shapeIndex = index;
  }

  function onMouseMove(event) {
    if (dragState.isDragging && dragState.shapeIndex !== null) {
      const dx = event.clientX - dragState.startX;
      const dy = event.clientY - dragState.startY;
      shapes.update(items => {
        const updatedItems = [...items];
        const shape = updatedItems[dragState.shapeIndex];
        shape.x += dx;
        shape.y += dy;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;
        return updatedItems;
      });
    } else if (dragState.isResizing && dragState.shapeIndex !== null) {
      const dx = event.clientX - dragState.startX;
      const dy = event.clientY - dragState.startY;
      shapes.update(items => {
        const updatedItems = [...items];
        const shape = updatedItems[dragState.shapeIndex];
        shape.width += dx;
        shape.height += dy;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;
        return updatedItems;
      });
    }
  }

  function onMouseUp() {
    dragState.isDragging = false;
    dragState.isResizing = false;
    dragState.shapeIndex = null;
  }

  function onRotationChange(event) {
    const newRotation = Number(event.target.value);
    if (selectedShapeIndex !== null) {
      shapes.update(items => {
        const updatedItems = [...items];
        const shape = updatedItems[selectedShapeIndex];
        shape.rotation = newRotation;
        return updatedItems;
      });
    }
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
</script>

<style>
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
  }

  .container {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 300px;
    background-color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    overflow: hidden;
  }

  .main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('https://www.toptal.com/designers/subtlepatterns/uploads/memphis-mini.png');
    background-size: cover;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
  }

  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h2 {
    color: #333;
    text-align: center;
    font-size: 24px;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: #555;
    margin-top: 10px;
  }

  .hidden-color-input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  input[type="color"],
  select,
  .btn {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    transition: all 0.3s;
  }

  input[type="color"]:focus,
  select:focus,
  .btn:focus {
    outline: none;
    border-color: #888;
  }

  .btn {
    cursor: pointer;
    font-weight: bold;
    color: #000;
  }

  .btn.add {
    background-color: #5af17d; 
  }

  .btn.add:hover {
    background-color: #28a745;
    color: #fff; 
  }

  .btn.delete {
    background-color: #f65868; 
  }

  .btn.delete:hover {
    background-color: #dc3545;
    color: #fff; 
  }

  .btn.download {
    background-color: #7baafc;
  }

  .btn.download:hover {
    background-color: #007bff; 
    color: #fff; 
  }

  .resize-title {
    font-size: 1em;
    font-weight: bold;
  }

  .resize-toolbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .range-input {
    width: 100%;
  }

  .shape-preview {
    border: 1px dashed #ccc;
    width: 500px;
    height: 500px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  .shape {
    cursor: move;
    transition: transform 0.3s ease;
  }

  .resize-handle {
    width: 10px;
    height: 10px;
    background: #000000;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: se-resize;
    transition: background 0.3s;
  }

  .resize-handle:hover {
    background: #007bff;
  }

  .logo {
    width: 100px;
    margin: 0 auto 20px;
    display: block;
  }

  .header {
    text-align: center;
  }

  .color-preview {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ddd;
    cursor: pointer;
    margin-top: 5px;
  }

  .download-options {
    display: flex;
    gap: 5px;
    margin-top: 5px;
  }
</style>

<div class="container">
  <div class="sidebar">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" class="logo">
    <h2>SVG Shape Generator</h2>
    <div class="toolbar">
      <label>
        Color:
        <input type="color" bind:value={color} on:input={updateColorPreview} class="hidden-color-input" />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="color-preview" style="background-color: {color};" on:click={triggerColorInput}></div>
      </label>
      <label>
        Shape:
        <select bind:value={svgShape}>
          <option value="M150 0 L75 200 L225 200 Z">Triangle</option>
          <option value="M100,100 C150,50 200,150 250,100 C300,50 350,150 400,100">Wave</option>
          <option value="M50,50 h150 v150 h-150 Z">Square</option>
          <option value="M250 100 A150 150 0 1 0 250 400 A150 150 0 1 0 250 100">Circle</option>
          <option value="Blob">Blob</option>
          <option value="M0,0 h100 v50 h-100 Z">Rectangle</option>
          <option value="M100 30 L170 75 L170 145 L100 190 L30 145 L30 75 Z">Hexagon</option> 
        </select>        
      </label>
      <label>
        Rotation:
        <input type="range" min="0" max="360" bind:value={rotation} class="range-input" on:input={onRotationChange} />
        <span>{rotation}°</span>
      </label>      
      <label>
        Resize Shape:
        <input type="range" min="10" max="500" bind:value={size} class="range-input" on:input={onSizeChange} />
      </label>
      <button class="btn add" on:click={addShape}>Add Shape</button>
      <button class="btn delete" on:click={deleteShape}>Delete Shape</button>
      <button class="btn download" on:click={() => showDownloadOptions = !showDownloadOptions}>
        {showDownloadOptions ? 'Close' : 'Download'}
      </button>
      {#if showDownloadOptions}
        <div class="download-options">
          <button class="btn download" on:click={downloadSVG}>SVG</button>
          <button class="btn download" on:click={downloadPNG}>PNG</button>
        </div>
      {/if}
    </div>
  </div>
  <div class="main">
    <div class="shape-preview">
      <svg>
        {#each $shapes as { id, path, color, x, y, width, height, rotation }, index}
        <g transform="translate({x},{y}) rotate({rotation})" class="shape" on:mousedown={(e) => startDrag(e, index)}>
        <path d={path} fill={color} stroke="none" transform={`scale(${width / 100},${height / 100})`} />
        <rect x={width - 10} y={height - 10} width="10" height="10" class="resize-handle" on:mousedown={(e) => startResize(e, index)} />
        </g>
        {/each}
      </svg>
    </div>
  </div>
</div>
