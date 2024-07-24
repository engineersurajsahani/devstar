<script>
	const maxCanvasWidth = 800;
	const maxCanvasHeight = 600;
	let imageUrl = '';
	let imageCanvas;
	let imageCtx;
	let img;
	let selectedFilter = null;

	const filters = {
		protanopia: [0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0],
		deuteranopia: [0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0],
		tritanopia: [0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1],
		achromatopsia: [0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0],
		achromatomaly: [0.618, 0.320, 0.062, 0, 0, 0.163, 0.775, 0.062, 0, 0, 0.163, 0.320, 0.516, 0, 0, 0, 0, 0, 1, 0],
		tritanomaly: [0.967, 0.033, 0, 0, 0, 0, 0.733, 0.267, 0, 0, 0, 0.183, 0.817, 0, 0, 0, 0, 0, 1, 0],
		protanomaly: [0.817, 0.183, 0, 0, 0, 0.333, 0.667, 0, 0, 0, 0, 0.125, 0.875, 0, 0, 0, 0, 0, 1, 0],
		deuteranomaly: [0.8, 0.2, 0, 0, 0, 0.258, 0.742, 0, 0, 0, 0, 0.142, 0.858, 0, 0, 0, 0, 0, 1, 0]
	};

	function resizeAndDrawImage(image) {
		if (!imageCanvas) {
			console.error('Canvas not found');
			return;
		}
		
		let imgWidth = image.width;
		let imgHeight = image.height;

		const scalingFactor = Math.min(maxCanvasWidth / imgWidth, maxCanvasHeight / imgHeight);
		imgWidth *= scalingFactor;
		imgHeight *= scalingFactor;

		imageCanvas.width = imgWidth;
		imageCanvas.height = imgHeight;
		imageCtx = imageCanvas.getContext('2d');
		imageCtx.clearRect(0, 0, imgWidth, imgHeight);
		imageCtx.drawImage(image, 0, 0, imgWidth, imgHeight);
		console.log('Image drawn on canvas');
	}

	function handleImageUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				imageUrl = reader.result;
				img = new Image();
				img.src = imageUrl;
				img.onload = () => {
					console.log('Image loaded');
					resizeAndDrawImage(img);
				};
				img.onerror = () => {
					console.error('Error loading image.');
				};
			};
			reader.readAsDataURL(file);
		}
	}

	function applyFilter(filterName) {
		selectedFilter = filterName;
		if (!filters[filterName] || !imageCanvas || !imageCtx) return;

		const filterMatrix = filters[filterName];
		resizeAndDrawImage(img); // Ensure the image is resized and redrawn

		const imageData = imageCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			data[i] = filterMatrix[0] * r + filterMatrix[1] * g + filterMatrix[2] * b;
			data[i + 1] = filterMatrix[5] * r + filterMatrix[6] * g + filterMatrix[7] * b;
			data[i + 2] = filterMatrix[10] * r + filterMatrix[11] * g + filterMatrix[12] * b;
		}

		imageCtx.putImageData(imageData, 0, 0);
	}

	function downloadImage() {
		if (imageCanvas) {
			const link = document.createElement('a');
			link.href = imageCanvas.toDataURL('image/png');
			link.download = 'colorblind-filtered-image.png';
			link.click();
		}
	}
</script>

<style>
    .container {
        max-width: 1000px;
        margin: 40px auto;
        padding: 30px;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        font-family: 'Arial', sans-serif;
    }

    .header {
        text-align: center;
        margin-bottom: 30px;
    }

    .upload-area {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }

    .file-upload-label {
        display: inline-block;
        padding: 12px 24px;
        background-color: #4a90e2;
        color: white;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
    }

    .file-upload-label:hover {
        background-color: #3a7bc8;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    input[type="file"] {
        display: none;
    }

    .canvas-container {
        margin: 20px 0;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 10px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    canvas {
        max-width: 100%;
        height: auto;
    }

    .button-group {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px;
        margin: 30px 0;
    }

    button {
        padding: 12px 20px;
        border: none;
        border-radius: 30px;
        background-color: #f0f0f0;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 600;
    }

    button.active {
        background-color: #4a90e2;
        color: white;
    }

    button:hover {
        background-color: #e0e0e0;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .download-section {
        text-align: center;
        margin-top: 30px;
    }

    .download-button {
        background-color: #27ae60;
        color: white;
        font-size: 1.1em;
        padding: 15px 30px;
    }

    .download-button:hover {
        background-color: #219653;
    }
</style>

<div class="container">
    <div class="header">
        <p>Upload an image and apply various colorblind filters</p>
    </div>

    <div class="upload-area">
        <label for="file-upload" class="file-upload-label">
            Choose an image
        </label>
        <input id="file-upload" type="file" accept="image/*" on:change="{handleImageUpload}" />
    </div>

    {#if imageUrl}
        <div class="canvas-container">
            <canvas bind:this="{imageCanvas}"></canvas>
        </div>

        <div class="button-group">
            <button class:active={selectedFilter === 'protanopia'} on:click={() => applyFilter('protanopia')}>Protanopia</button>
            <button class:active={selectedFilter === 'deuteranopia'} on:click={() => applyFilter('deuteranopia')}>Deuteranopia</button>
            <button class:active={selectedFilter === 'tritanopia'} on:click={() => applyFilter('tritanopia')}>Tritanopia</button>
            <button class:active={selectedFilter === 'achromatopsia'} on:click={() => applyFilter('achromatopsia')}>Achromatopsia</button>
            <button class:active={selectedFilter === 'achromatomaly'} on:click={() => applyFilter('achromatomaly')}>Achromatomaly</button>
            <button class:active={selectedFilter === 'tritanomaly'} on:click={() => applyFilter('tritanomaly')}>Tritanomaly</button>
            <button class:active={selectedFilter === 'protanomaly'} on:click={() => applyFilter('protanomaly')}>Protanomaly</button>
            <button class:active={selectedFilter === 'deuteranomaly'} on:click={() => applyFilter('deuteranomaly')}>Deuteranomaly</button>
        </div>

        <div class="download-section">
            <button class="download-button" on:click={downloadImage}>Download Image</button>
        </div>
    {/if}
</div>
