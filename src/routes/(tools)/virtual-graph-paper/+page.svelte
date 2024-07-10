<script>
	let zoomLevel = 1;
	let tool = 'select';
	let annotations = [];
	let gridSize = 20;
	let gridColor = "#000000";
  
	function zoomIn() {
	  zoomLevel += 0.1;
	}
  
	function zoomOut() {
	  if (zoomLevel > 0.2) {
		zoomLevel -= 0.1;
	  }
	}
  
	function selectTool(selectedTool) {
	  tool = selectedTool;
	}
  
	function addAnnotation(event) {
	  if (tool === 'annotation') {
		const text = prompt("Enter annotation text:");
		if (text) {
		  annotations = [...annotations, { text, x: event.clientX, y: event.clientY }];
		}
	  }
	}
  
	function updateGridSize(event) {
	  gridSize = event.target.value;
	}
  
	function updateGridColor(event) {
	  gridColor = event.target.value;
	}
  </script>
  
  <style>
	.controls {
	  margin-bottom: 1rem;
	  display: flex;
	  flex-direction: column;
	  gap: 1rem;
	}
  
	.controls button,
	.controls label {
	  padding: 0.5rem 1rem;
	  background-color: #baff88;
	  color: rgb(0, 0, 0);
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	}
  
	.controls label {
	  display: flex;
	  flex-direction: column;
	  align-items: flex-start;
	}
  
	.controls label input {
	  margin-top: 0.5rem;
	  padding: 0.5rem;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	}
  
	.graph-paper {
	  position: relative;
	  width: 100%;
	  height: 600px; /* Set a height for the graph paper area */
	  transition: transform 0.3s;
	}
  
	.annotation {
	  position: absolute;
	  background: white;
	  border: 1px solid black;
	  padding: 2px 5px;
	  border-radius: 3px;
	}
  
	h2 {
	  margin-top: 1rem;
	}
  
	ul {
	  list-style-type: none;
	  padding: 0;
	}
  
	li {
	  margin-bottom: 0.5rem;
	}
  </style>
  
  <div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<div class="controls">
	  <button on:click={zoomIn}>Zoom In</button>
	  <button on:click={zoomOut}>Zoom Out</button>
	  <button on:click={() => selectTool('select')}>Select</button>
	  <button on:click={() => selectTool('annotation')}>Annotation</button>
	  <label>
		Grid Size:
		<input type="number" value={gridSize} on:input={updateGridSize} />
	  </label>
	  <label>
		Grid Color:
		<input type="color" value={gridColor} on:input={updateGridColor} />
	  </label>
	</div>
	<div
	  class="graph-paper"
	  style="
		transform: scale({zoomLevel});
		transform-origin: top left;
		background-size: {gridSize}px {gridSize}px;
		background-color: white;
		background-image: linear-gradient(to right, {gridColor} 1px, transparent 1px), 
						  linear-gradient(to bottom, {gridColor} 1px, transparent 1px);
	  "
	  on:click={addAnnotation}
	>
	  {#each annotations as { text, x, y }}
		<div class="annotation" style="left: {x}px; top: {y}px;">{text}</div>
	  {/each}
	</div>
  </div>