<script>
	import { onMount } from 'svelte';

	let defaultBackgroundImageURL = 'https://images.unsplash.com/photo-1519681393784-d120267933ba';
	let backgroundImageURL = '';
	let blurValue = 16;
	let opacity = 0.75;
	let saturation = 180;
	let color = '#ffffff'; // Default color
	let generatedCSS = generateCSS();

	// Function to generate the CSS code
	function generateCSS() {
		return `
/* Background styles */
body {
	background-image: url('${backgroundImageURL || defaultBackgroundImageURL}');
	background-position: center;
}

/* Glassmorphism card effect */
.card {
	backdrop-filter: blur(${blurValue}px) saturate(${saturation}%);
	-webkit-backdrop-filter: blur(${blurValue}px) saturate(${saturation}%);
	background-color: ${hexToRgba(color, opacity)};
	border-radius: 12px;
	border: 1px solid rgba(209, 213, 219, 0.3);
}
		`;
	}

	// Copy CSS to clipboard
	function copyCSS() {
		navigator.clipboard.writeText(generatedCSS).then(() => {
			alert('CSS copied to clipboard!');
		});
	}

	onMount(() => {
		updatePreviewStyles();
	});

	// Update preview styles dynamically
	function updatePreviewStyles() {
		const preview = document.querySelector('.preview');
		preview.style.backgroundImage = `url(${backgroundImageURL || defaultBackgroundImageURL})`;

		const card = document.querySelector('.preview .card');
		card.style.backdropFilter = `blur(${blurValue}px) saturate(${saturation}%)`;
		card.style.webkitBackdropFilter = `blur(${blurValue}px) saturate(${saturation}%)`;
		card.style.backgroundColor = hexToRgba(color, opacity);

		generatedCSS = generateCSS();
	}

	// Convert hex color to rgba
	function hexToRgba(hex, alpha) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}
</script>

<div class="tool-container">
	<div class="settings text-black-100 dark:text-gray-500">
		<label>
			Background image URL:
			<input type="text" style="border-radius: 10px; margin-top: 0.5rem" bind:value={backgroundImageURL} on:input={updatePreviewStyles} placeholder="Enter image URL or leave blank for default" />
		</label>
		<label>
			Blur value:
			<input type="range" min="0" max="30" bind:value={blurValue} on:input={updatePreviewStyles} />
			<span>{blurValue}px</span>
		</label>
		<label>
			Opacity:
			<input type="range" min="0" max="1" step="0.01" bind:value={opacity} on:input={updatePreviewStyles} />
			<span>{Math.round(opacity * 100)}%</span>
		</label>
		<label>
			Saturation:
			<input type="range" min="0" max="300" bind:value={saturation} on:input={updatePreviewStyles} />
			<span>{saturation}%</span>
		</label>
		<label>
			Color:
			<input type="color" bind:value={color} on:input={updatePreviewStyles} />
			<span>{color}</span>
		</label>
	</div>

	<div class="preview" style="background-image: url({backgroundImageURL || defaultBackgroundImageURL})">
		<div class="card">
			<p>Fruits</p>
			<p>Apple</p>
			<p>Mango</p>
			<p>Banana</p>
			<p>Orange</p>
		</div>
	</div>

	<div class="css-output text-black-100 dark:text-gray-500">
		<h3><b>Generated CSS:</b></h3>
		<div class="css-container">
			<pre>{generatedCSS}</pre>
			<button class="copy-button" on:click={copyCSS}>Copy</button>
		</div>
	</div>
</div>

<style>
	.tool-container {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 1rem;
	}

	.settings {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.preview {
		background-position: center;
		padding: 2rem;
		border-radius: 12px;
		border: 1px solid rgba(209, 213, 219, 0.3);
	}

	.card {
		border-radius: 12px;
		border: 1px solid rgba(209, 213, 219, 0.3);
		padding: 1rem;
	}

	.css-output {
		grid-column: span 2;
		position: relative;
	}

	.css-container {
		position: relative;
	}

	.copy-button {
		position: absolute;
		top: 25px;
		right: 25px;
		padding: 0.5rem 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.copy-button:hover {
		background-color: #0056b3;
	}

	pre {
		background: #f0f0f0;
		padding: 1rem;
		border-radius: 4px;
		white-space: pre-wrap;
		word-break: break-all;
		position: relative;
	}

	h3 {
		margin-top: 0;
	}
	input[type=color] {
		background-color: transparent; 
		border: 0.5px solid gray; 
		padding: 1px;
		height: 2rem; 
		width: 4rem; 
		border-radius: 3px;
	}
</style>
