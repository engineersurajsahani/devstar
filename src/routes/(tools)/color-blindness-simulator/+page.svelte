<script>
    import { onMount } from "svelte";

    let imageSrc = "";
    let colorBlindnessType = "Deuteranomaly";
    let imageCache = {};
    let urlCache = {};
    let currentImage = null;
    let downloadUrl = "";

    const ColorMatrixMatrixes = {
        Normal: { R: [100, 0, 0], G: [0, 100, 0], B: [0, 0, 100] },
        Deuteranopia: { R: [62.5, 37.5, 0], G: [70, 30, 0], B: [0, 30, 70] },
        Deuteranomaly: { R: [80, 20, 0], G: [25.833, 74.167, 0], B: [0, 14.167, 85.833] },
        Protanopia: { R: [56.667, 43.333, 0], G: [55.833, 44.167, 0], B: [0, 24.167, 75.833] },
        Protanomaly: { R: [81.667, 18.333, 0], G: [33.333, 66.667, 0], B: [0, 12.5, 87.5] },
        Tritanopia: { R: [95, 5, 0], G: [0, 43.333, 56.667], B: [0, 47.5, 52.5] },
        Tritanomaly: { R: [96.667, 3.333, 0], G: [0, 73.333, 26.667], B: [0, 18.333, 81.667] },
        Achromatomaly: { R: [29.9, 58.7, 11.4], G: [29.9, 58.7, 11.4], B: [29.9, 58.7, 11.4] },
        Achromatopsia: { R: [0, 0, 100], G: [0, 0, 100], B: [0, 0, 100] }
    };

    const colorMatrixFilterFunctions = {};

    for (let key in ColorMatrixMatrixes) {
        if (ColorMatrixMatrixes.hasOwnProperty(key)) {
            colorMatrixFilterFunctions[key] = matrixFunction(ColorMatrixMatrixes[key]);
        }
    }

    function matrixFunction(a) {
        return function (b) {
            var c = b[0], d = b[1], e = b[2];
            return [
                c * a.R[0] / 100 + d * a.R[1] / 100 + e * a.R[2] / 100,
                c * a.G[0] / 100 + d * a.G[1] / 100 + e * a.G[2] / 100,
                c * a.B[0] / 100 + d * a.B[1] / 100 + e * a.B[2] / 100
            ];
        };
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageSrc = e.target.result;
                const img = new Image();
                img.onload = () => {
                    currentImage = img;
                    clearImageCache();
                    filterOrImageChanged();
                };
                img.src = imageSrc;
            };
            reader.readAsDataURL(file);
        }
    }

    function applyColorBlindnessFilter() {
        if (currentImage) {
            getFilteredImage(currentImage, colorBlindnessType, (filteredImg, url) => {
                imageSrc = url;
                downloadUrl = url;
            });
        }
    }

    function clearImageCache() {
        imageCache = {};
        urlCache = {};
    }

    function getFilteredImage(image, filter, callback) {
        if (filter in imageCache) {
            callback(imageCache[filter], urlCache[filter]);
        } else {
            createFilteredImage(image, filter, (filteredImg, url) => {
                imageCache[filter] = filteredImg;
                urlCache[filter] = url;
                callback(filteredImg, url);
            });
        }
    }

    function createFilteredImage(image, filter, callback) {
        const filterFunction = getFilterFunction(filter);
        const canvas = document.createElement("canvas");
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const [r, g, b] = filterFunction([data[i], data[i + 1], data[i + 2]]);
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
        ctx.putImageData(imageData, 0, 0);
        const dataUrl = canvas.toDataURL();
        const filteredImage = new Image();
        filteredImage.onload = () => callback(filteredImage, dataUrl);
        filteredImage.src = dataUrl;
    }

    function getFilterFunction(filter) {
        if (filter in colorMatrixFilterFunctions) {
            return colorMatrixFilterFunctions[filter];
        }
        throw new Error("Invalid Filter Type!");
    }

    function filterOrImageChanged() {
        applyColorBlindnessFilter();
    }

    onMount(() => {
        const fileInput = document.getElementById("imageInput");
        fileInput.onchange = handleImageUpload;
    });
</script>

<div class="container">
    <div class="upload-section">
        <input type="file" id="imageInput" accept="image/*">
        <button on:click="{() => document.getElementById('imageInput').click()}">Upload Image</button>
        {#if downloadUrl}
            <a href={downloadUrl} download="filtered_image.png">Download Image</a>
        {/if}
    </div>

    <div class="simulation-options">
        <div id="section1" class="option-category">
            <h3>DEUTAN</h3>
            <button on:click="{() => {colorBlindnessType = 'Deuteranomaly'; filterOrImageChanged();}}">Green-Weak/Deuteranomaly</button>
            <button on:click="{() => {colorBlindnessType = 'Deuteranopia'; filterOrImageChanged();}}">Green-Blind/Deuteranopia</button>
        </div>
        <div id="section2" class="option-category">
            <h3>PROTAN</h3>
            <button on:click="{() => {colorBlindnessType = 'Protanomaly'; filterOrImageChanged();}}">Red-Weak/Protanomaly</button>
            <button on:click="{() => {colorBlindnessType = 'Protanopia'; filterOrImageChanged();}}">Red-Blind/Protanopia</button>
        </div>
        <div id="section3" class="option-category">
            <h3>TRITAN</h3>
            <button on:click="{() => {colorBlindnessType = 'Tritanomaly'; filterOrImageChanged();}}">Blue-Weak/Tritanomaly</button>
            <button on:click="{() => {colorBlindnessType = 'Tritanopia'; filterOrImageChanged();}}">Blue- Blind/Tritanopia</button>
        </div>
        <div id="section4" class="option-category">
            <h3>BLACK/WHITE</h3>
            <button on:click="{() => {colorBlindnessType = 'Achromatomaly'; filterOrImageChanged();}}">Monochromacy/ Achromatopsia</button>
            <button on:click="{() => {colorBlindnessType = 'Achromatopsia'; filterOrImageChanged();}}">Blue Cone Monochromacy</button>
        </div>
    </div>

    <div class="output">
        {#if imageSrc}
            <img src={imageSrc} alt="Uploaded Image" class="filtered-image">
        {/if}
    </div>
</div>

<style>
    .container {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }

    .upload-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .upload-section input[type="file"] {
        display: none;
    }

    .upload-section button,
    .upload-section a {
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        background-color: #333;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
    }

    .upload-section a {
        background-color: #f90;
    }

    .upload-section button:hover,
    .upload-section a:hover {
        opacity: 0.8;
    }

    .simulation-options {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .option-category {
        flex: 1;
        text-align: center;
        margin: 0 10px;
    }

    .option-category h3 {
        margin-bottom: 10px;
        font-size: 20px;
        color: #f90;
    }

    .option-category button {
        display: block;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        color: #333;
        background-color:  whitesmoke;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .option-category button:hover {
        opacity: 0.8;
    }

    .output {
        text-align: center;
    }

    .output img.filtered-image {
        max-width: 100%;
        height: auto;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>
