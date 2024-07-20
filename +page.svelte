<script>
  import { writable } from 'svelte/store';

  let color = '#FF0066';
  let svgShape = 'M150 0 L75 200 L225 200 Z'; 
  const shapes = writable([]);
  let selectedShapeIndex = null;
  let size = 100; // Default size

  let dragState = {
    isDragging: false,
    isResizing: false,
    startX: 0,
    startY: 0,
    shapeIndex: null
  };

  function addShape() {
    shapes.update(items => [
      ...items,
      { id: items.length, path: svgShape, color, x: 0, y: 0, width: size, height: size }
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

  function downloadSVG() {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
        ${$shapes.map(shape => `<path d="${shape.path}" fill="${shape.color}" transform="translate(${shape.x},${shape.y}) scale(${shape.width / 100},${shape.height / 100})" />`).join('')}
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

  function startDrag(event, index) {
    dragState.isDragging = true;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
    dragState.shapeIndex = index;
    selectedShapeIndex = index;
    size = $shapes[index].width; // Set initial size for the selected shape
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

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
</script>

<style>
  .container {
    display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  .sidebar {
    width: 250px;
    background-color: #f4f4f4;
    padding: 20px;
  }
  .main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .resize-toolbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .resize-title {
    font-size: 1em;
    font-weight: bold;
  }
  .shape-preview {
    border: 1px dashed #ccc;
    width: 500px;
    height: 500px;
    position: relative;
  }
  .shape {
    cursor: move;
  }
  .resize-handle {
    width: 10px;
    height: 10px;
    background: #000000;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: se-resize;
  }
  .btn {
    background-color: green;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .btn.delete {
    background-color: red;
  }
  .btn.resize {
    background-color: blue;
    flex: 1;
    padding: 10px;
  }
  .range-input {
    width: 100%;
  }
</style>

<div class="container">
  <div class="sidebar">
    <h2>SVG Shape Generator</h2>
    <div class="toolbar">
      <label>
        Color:
        <input type="color" bind:value={color} />
      </label>
      <label>
        Shape:
        <select bind:value={svgShape}>
          <option value="M150 0 L75 200 L225 200 Z">Triangle</option>
          <option value="M100,100 C150,50 200,150 250,100 C300,50 350,150 400,100">Wave</option>
          <option value="M150 0 L75 200 L225 200 Q150 300 75 400 Q225 500 150 600 L0 600 Z">Complex</option>
          <option value="M50,50 h150 v150 h-150 Z">Square</option>
          <option value="M100,200 Q150,50 200,200 T300,200">Arc</option>
        </select>
      </label>
      <button class="btn" on:click={addShape}>Add Shape</button>
      <button class="btn delete" on:click={deleteShape}>Delete Shape</button>
      <button class="btn" on:click={downloadSVG}>Download</button>
      <div class="resize-title">Resize Shape</div>
      <div class="resize-toolbar">
        <input type="range" min="10" max="500" bind:value={size} class="range-input" on:input={onSizeChange} />
      </div>
    </div>
  </div>
  <div class="main">
    <div class="shape-preview">
      <svg width="100%" height="100%">
        {#each $shapes as { id, path, color, x, y, width, height }, index}
          <g transform="translate({x}, {y})" class="shape" on:mousedown={(e) => startDrag(e, index)}>
            <path d={path} fill={color} transform={`scale(${width / 100}, ${height / 100})`} />
            <rect x={width - 10} y={height - 10} width="10" height="10" class="resize-handle" on:mousedown={(e) => startResize(e, index)} />
          </g>
        {/each}
      </svg>
    </div>
  </div>
</div>
