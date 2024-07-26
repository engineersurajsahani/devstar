<script>
    import { onMount } from 'svelte';

    let width = 300;
    let height = 150;
    let bgColor = '#cccccc';
    let text = 'Placeholder';
    let textColor = '#000000';
    let fontSize = 20;

    let svgContent = '';
    let downloadLink = '';
    let svgHtmlCode = '';
    let base64Code = '';

    function generateSvg() {
        svgContent = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="${bgColor}" />
                <text x="50%" y="50%" fill="${textColor}" font-size="${fontSize}" font-family="Arial" dy=".3em" text-anchor="middle">${text}</text>
            </svg>
        `;
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
        downloadLink = URL.createObjectURL(svgBlob);
        svgHtmlCode = svgContent.trim();
        base64Code = btoa(svgContent);
    }

    onMount(() => {
        generateSvg();
    });

    function handleWidthChange(event) {
        width = event.target.value;
        generateSvg();
    }

    function handleHeightChange(event) {
        height = event.target.value;
        generateSvg();
    }

    function handleBgColorChange(event) {
        bgColor = event.target.value;
        generateSvg();
    }

    function handleTextChange(event) {
        text = event.target.value;
        generateSvg();
    }

    function handleTextColorChange(event) {
        textColor = event.target.value;
        generateSvg();
    }

    function handleFontSizeChange(event) {
        fontSize = event.target.value;
        generateSvg();
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    }
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
    <div class="container max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg border-4 border-gray-300">
        <h1 class="text-3xl font-bold mb-6 text-center">SVG Placeholder Generator</h1>

        <div class="grid gap-4 mb-6">
            <div class="flex flex-col">
                <label for="width-input" class="font-medium mb-1">Width:</label>
                <input id="width-input" type="number" value={width} on:input={handleWidthChange} class="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            </div>
            <div class="flex flex-col">
                <label for="height-input" class="font-medium mb-1">Height:</label>
                <input id="height-input" type="number" value={height} on:input={handleHeightChange} class="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            </div>
            <div class="flex flex-col">
                <label for="bgcolor-input" class="font-medium mb-1">Background Color:</label>
                <input id="bgcolor-input" type="color" value={bgColor} on:input={handleBgColorChange} class="h-10 w-full py-0.5 px-1 rounded-lg bg-gray-700 border border-gray-600" />
            </div>
            <div class="flex flex-col">
                <label for="text-input" class="font-medium mb-1">Text:</label>
                <input id="text-input" type="text" value={text} on:input={handleTextChange} class="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            </div>
            <div class="flex flex-col">
                <label for="textcolor-input" class="font-medium mb-1">Text Color:</label>
                <input id="textcolor-input" type="color" value={textColor} on:input={handleTextColorChange} class="h-10 w-full py-0.5 px-1 rounded-lg bg-gray-700 border border-gray-600" />
            </div>
            <div class="flex flex-col">
                <label for="fontsize-input" class="font-medium mb-1">Font Size:</label>
                <input id="fontsize-input" type="number" value={fontSize} on:input={handleFontSizeChange} class="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            </div>
        </div>

        <div>
            <h2 class="text-xl font-medium mb-2">Generated SVG:</h2>
            <div class="svg-container bg-white p-3 rounded-lg shadow-lg">
                {@html svgContent}
            </div>
        </div>

        <div class="mt-6">
            <a href={downloadLink} download="placeholder.svg" class="inline-block bg-white hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-lg transition-colors duration-300">Download SVG</a>
        </div>

        <div class="mt-6">
            <h2 class="text-xl font-medium mb-2">SVG HTML Element Code:</h2>
            <div class="relative">
                <textarea readonly class="w-full h-32 p-2 rounded-lg bg-gray-700 border border-gray-600 text-white">{svgHtmlCode}</textarea>
                <button on:click={() => copyToClipboard(svgHtmlCode)} class="absolute top-2 right-7 bg-white hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-lg transition-colors duration-300">Copy</button>
            </div>
        </div>

        <div class="mt-6">
            <h2 class="text-xl font-medium mb-2">Base64 Encoded SVG:</h2>
            <div class="relative">
                <textarea readonly class="w-full h-32 p-2 rounded-lg bg-gray-700 border border-gray-600 text-white">data:image/svg+xml;base64,{base64Code}</textarea>
                <button on:click={() => copyToClipboard(`data:image/svg+xml;base64,${base64Code}`)} class="absolute top-2 right-7 bg-white hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-lg transition-colors duration-300">Copy</button>
            </div>
        </div>
    </div>
</main>

<style>
    .svg-container {
        border: 2px solid #000;
        display: inline-block;
        max-width: 100%;
    }
    .relative {
        position: relative;
    }
</style>
