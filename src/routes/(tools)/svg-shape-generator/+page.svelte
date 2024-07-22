<script>
	import { writable } from 'svelte/store';
  
	let color = '#FF0066';
	let svgShape = 'M150 0 L75 200 L225 200 Z'; 
	const shapes = writable([]);
	let selectedShapeIndex = null;
	let size = 100; 
	let showDownloadOptions = false; 
  
	let dragState = {
	  isDragging: false,
	  isResizing: false,
	  startX: 0,
	  startY: 0,
	  shapeIndex: null
	};
  
	function randomPoints(count, width, height) {
	  const points = [];
	  for (let i = 0; i < count; i++) {
		const x = Math.random() * width;
		const y = Math.random() * height;
		points.push({ x, y });
	  }
	  return points;
	}
  
	function generateRandomPath(points) {
	  if (points.length < 2) return ''; 
  
	  let path = `M${points[0].x},${points[0].y} `;
	  for (let i = 1; i < points.length; i++) {
		path += `L${points[i].x},${points[i].y} `;
	  }
	  path += 'Z'; 
	  return path;
	}
  
	function randomShape() {
	  const pointCount = Math.floor(Math.random() * 5) + 3; 
	  const points = randomPoints(pointCount, 500, 500); 
	  return generateRandomPath(points);
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
	  const shapeToAdd = svgShape === 'Random' ? randomShape() :
		svgShape === 'Blob' ? generateBlobPath() :
		svgShape;
  
	  shapes.update(items => [
		...items,
		{ id: items.length, path: shapeToAdd, color, x: 0, y: 0, width: size, height: size }
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
  
	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('mouseup', onMouseUp);
</script>

<style>
	body {
	  margin: 0;
	  font-family: 'Roboto', sans-serif;
	  background: #f0f4f8;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 100vh;
	}
  
	.container {
	  display: flex;
	  background: white;
	  border-radius: 10px;
	  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	  overflow: hidden;
	}
  
	.sidebar {
	  width: 320px;
	  background-color: #e0e0e0; 
	  padding: 20px;
	  border-right: 1px solid #c0c0c0;
	  display: flex;
	  flex-direction: column;
	  gap: 20px;
	}
  
	.main {
	  flex-grow: 1;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  padding: 20px;
	  background: url('https://www.toptal.com/designers/subtlepatterns/uploads/memphis-mini.png'); 
	}
  
	.shape-container {
	  background: #fff;
	  padding: 10px;
	  border-radius: 8px;
	  border: 1px solid #ccc;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
  
	.input-group {
	  display: flex;
	  flex-direction: column;
	  gap: 5px;
	}
  
	.color-picker-wrapper {
	  display: flex;
	  align-items: center;
	  gap: 10px;
	}
  
	.color-picker {
	  width: 100%;
	  height: 30px;
	  border: none;
	  cursor: pointer;
	}
  
	.color-preview {
	  width: 30px;
	  height: 30px;
	  background-color: #fff;
	  border: 1px solid #ccc;
	  cursor: pointer;
	}
  
	button {
	  background: #007bff;
	  color: white;
	  border: none;
	  border-radius: 5px;
	  padding: 10px;
	  cursor: pointer;
	  transition: background 0.3s ease;
	}
  
	button:hover {
	  background: #01274f;
	}
  
	svg {
	  border: 1px solid #ccc;
	  border-radius: 10px;
	  background: white;
	  cursor: grab;
	}
  
	.shape {
	  cursor: move;
	}

	h2 {
		color: #333;
		text-align: center;
		font-size: 24px;
  	}

	.logo {
		width: 100px;
		margin: 0 auto 20px;
		display: block;
  	}
  
	.resize-handle {
	  cursor: nwse-resize;
	}
</style>

<div class="container">
	<div class="sidebar">
		<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" class="logo">
    	<h2>SVG Shape Generator</h2>
		<div class="input-group">
			<label for="color">Color</label>
			<div class="color-picker-wrapper">
				<input type="color" id="color" bind:value={color} on:input={updateColorPreview} class="color-picker" />
				<div class="color-preview" on:click={triggerColorInput}></div>
			</div>
		</div>

		<div class="input-group">
			<label for="svgShape">SVG Shape</label>
			<select id="svgShape" bind:value={svgShape}>
				<option value="Random">Random Shape</option>
				<option value="M150 0 L75 200 L225 200 Z">Triangle</option>
				<option value="M100,100 C150,50 200,150 250,100 C300,50 350,150 400,100">Wave</option>
				<option value="M50,50 h150 v150 h-150 Z">Square</option>
				<option value="M100,200 Q150,50 200,200 T300,200">Arc</option>
				<option value="M250 100 A150 150 0 1 0 250 400 A150 150 0 1 0 250 100">Circle</option>
				<option value="Blob">Blob</option>
			</select>
		</div>

		<div class="input-group">
			<label for="size">Size</label>
			<input type="range" id="size" min="50" max="200" bind:value={size} on:input={onSizeChange} />
		</div>

		<button on:click={addShape}>Add Shape</button>
		<button on:click={deleteShape}>Delete Shape</button>

		<button on:click={() => showDownloadOptions = !showDownloadOptions}>
			{showDownloadOptions ? 'Hide' : 'Show'} Download Options
		</button>
		{#if showDownloadOptions}
			<button on:click={downloadSVG}>Download as SVG</button>
		{/if}
	</div>

	<div class="main">
		<svg width="500" height="500">
			{#each $shapes as shape, index}
				<g transform="translate({shape.x}, {shape.y})">
					<path
						d={shape.path}
						fill={shape.color}
						stroke="none"
						transform="scale({shape.width / 100}, {shape.height / 100})"
						class="shape"
						on:mousedown={(event) => startDrag(event, index)}
					/>
					<rect
						x={shape.width - 10}
						y={shape.height - 10}
						width="10"
						height="10"
						fill="transparent"
						class="resize-handle"
						on:mousedown={(event) => startResize(event, index)}
					/>
				</g>
			{/each}
		</svg>
	</div>
</div>
