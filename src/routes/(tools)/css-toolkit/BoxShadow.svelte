<script>
	// Box Shadow Generator is done by Kaif Satopay and Tanvi More
	let offsetX = 10;
	let offsetY = 10;
	let blurRadius = 5;
	let spreadRadius = 0;
	let color = "#000000";
  
	// Log color changes to console
	$: console.log('Color changed:', color);
  
	// Reactive declaration to update box shadow when any of the values change
	$: boxShadow = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
  </script>
  
  <div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<div class="flex flex-col space-y-4 p-8 bg-gray-100 rounded-lg">
	  <!-- Controls for user input -->
	  <div class="mb-4">
		<label for="offsetX" class="block text-lg font-medium text-gray-700">Offset X: {offsetX}px</label>
		<input id="offsetX" type="range" min="-50" max="50" bind:value={offsetX} class="w-full mt-2">
	  </div>
  
	  <div class="mb-4">
		<label for="offsetY" class="block text-lg font-medium text-gray-700">Offset Y: {offsetY}px</label>
		<input id="offsetY" type="range" min="-50" max="50" bind:value={offsetY} class="w-full mt-2">
	  </div>
  
	  <div class="mb-4">
		<label for="blurRadius" class="block text-lg font-medium text-gray-700">Blur Radius: {blurRadius}px</label>
		<input id="blurRadius" type="range" min="0" max="50" bind:value={blurRadius} class="w-full mt-2">
	  </div>
  
	  <div class="mb-4">
		<label for="spreadRadius" class="block text-lg font-medium text-gray-700">Spread Radius: {spreadRadius}px</label>
		<input id="spreadRadius" type="range" min="0" max="50" bind:value={spreadRadius} class="w-full mt-2">
	  </div>
  
	  <div class="mb-4">
		<label for="color" class="block text-lg font-medium text-gray-700">Color:</label>
		<input id="color" type="color" bind:value={color} class="w-full mt-2">
	  </div>
	</div>
  
	<div class="flex flex-col items-center justify-center">
	  <!-- Preview box -->
	  <div class="preview-box w-64 h-64 bg-white shadow-md rounded-lg" style="box-shadow: {boxShadow}"></div>
	  <!-- CSS output preview -->
	  <pre class="bg-gray-200 p-4 mt-4 rounded-lg text-sm text-gray-800 text-center custom-pre">
		box-shadow: {boxShadow};
	  </pre>
	</div>
  </div>
  
  <style>
	.preview-box {
	  transition: box-shadow 0.3s ease-in-out;
	}
	.custom-pre {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 100px; /* Adjust height as needed */
	}
  </style>