<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let mode = "draw";
    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    let gridCanvas, drawCanvas;
    let gridCtx, drawCtx;

    const cellSize = writable(32);
    const snapEnabled = writable(true);
    let color = "#000";
    let lineWidth = 2;

    onMount(() => {
        gridCtx = gridCanvas.getContext("2d");
        drawCtx = drawCanvas.getContext("2d");
        drawGrid();
    });

    function drawGrid() {
        gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        gridCtx.strokeStyle = "#ccc";
        gridCtx.lineWidth = 1;

        const gridSize = $cellSize;
        for (let x = 0; x <= gridCanvas.width; x += gridSize) {
            gridCtx.beginPath();
            gridCtx.moveTo(x, 0);
            gridCtx.lineTo(x, gridCanvas.height);
            gridCtx.stroke();
        }

        for (let y = 0; y <= gridCanvas.height; y += gridSize) {
            gridCtx.beginPath();
            gridCtx.moveTo(0, y);
            gridCtx.lineTo(gridCanvas.width, y);
            gridCtx.stroke();
        }
    }

    function startDrawing(e) {
        isDrawing = true;
        startX = snapToGrid(e.offsetX);
        startY = snapToGrid(e.offsetY);
        drawCtx.beginPath();
        if (mode === "draw") {
            draw(e);
        }
    }

    function endDrawing(e) {
        if (!isDrawing) return;
        isDrawing = false;
        if (mode === "line") {
            drawLine(e);
        } else if (mode === "rect") {
            drawRect(e);
        } else if (mode === "circle") {
            drawCircle(e);
        }
        drawCtx.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;

        drawCtx.lineWidth = lineWidth;
        drawCtx.strokeStyle = color;
        drawCtx.lineCap = "round";

        drawCtx.lineTo(snapToGrid(e.offsetX), snapToGrid(e.offsetY));
        drawCtx.stroke();
        drawCtx.beginPath();
        drawCtx.moveTo(snapToGrid(e.offsetX), snapToGrid(e.offsetY));
    }

    function drawLine(e) {
        drawCtx.lineWidth = lineWidth;
        drawCtx.strokeStyle = color;
        drawCtx.moveTo(startX, startY);
        drawCtx.lineTo(snapToGrid(e.offsetX), snapToGrid(e.offsetY));
        drawCtx.stroke();
    }

    function drawRect(e) {
        drawCtx.lineWidth = lineWidth;
        drawCtx.strokeStyle = color;
        const width = snapToGrid(e.offsetX) - startX;
        const height = snapToGrid(e.offsetY) - startY;
        drawCtx.strokeRect(startX, startY, width, height);
    }

    function drawCircle(e) {
        drawCtx.lineWidth = lineWidth;
        drawCtx.strokeStyle = color;
        const radius = Math.sqrt(
            Math.pow(snapToGrid(e.offsetX) - startX, 2) + Math.pow(snapToGrid(e.offsetY) - startY, 2)
        );
        drawCtx.beginPath();
        drawCtx.arc(startX, startY, radius, 0, Math.PI * 2);
        drawCtx.stroke();
    }

    function erase(e) {
        if (!isDrawing) return;

        drawCtx.clearRect(e.offsetX - 5, e.offsetY - 5, 10, 10);
    }

    function setMode(newMode) {
        mode = newMode;
    }

    function saveDrawing() {
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = drawCanvas.toDataURL('image/png');
        link.click();
    }

    function snapToGrid(coord) {
        const gridSize = $cellSize;
        const snap = $snapEnabled;
        if (snap) {
            return Math.round(coord / gridSize) * gridSize;
        } else {
            return coord;
        }
    }

    function toggleSnap() {
        snapEnabled.update(value => !value);
    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: Arial, sans-serif;
    }

    .tools {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .tool-btn {
        background-color: #366b77;
        border: none;
        color: white;
        padding: 5px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s;
    }

    .tool-btn:hover {
        background-color: #069098;
    }

    .tool-btn.active {
        background-color: #008CBA; 
    }

    .settings {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    .settings label {
        margin: 0 10px;
    }

    .color-picker {
        margin-left: 10px;
    }

    .canvas-container {
        position: relative;
        width: 100%;
        max-width: 900px;
        height: 600px;
        margin: auto;
        overflow: hidden;
    }

    canvas {
        border: 1px solid #f9f6f6;
        position: absolute;
        left: 0;
        top: 0;
        touch-action: none; 
    }
</style>

<div class="container">
    <div class="card">
        <div class="tools">
            <button class="tool-btn {mode === 'draw' ? 'active' : ''}" on:click={() => setMode('draw')}>Draw</button>
            <button class="tool-btn {mode === 'line' ? 'active' : ''}" on:click={() => setMode('line')}>Line</button>
            <button class="tool-btn {mode === 'rect' ? 'active' : ''}" on:click={() => setMode('rect')}>Rectangle</button>
            <button class="tool-btn {mode === 'circle' ? 'active' : ''}" on:click={() => setMode('circle')}>Circle</button>
            <button class="tool-btn {mode === 'eraser' ? 'active' : ''}" on:click={() => setMode('eraser')}>Eraser</button>
            <button class="tool-btn" on:click={saveDrawing}>Save</button>
            <button class="tool-btn" on:click={toggleSnap}>Snap to Grid</button>
        </div>
        <div class="settings">
            <label>Color:</label>
            <input class="color-picker" type="color" bind:value={color}>
            <label>Line Width:</label>
            <input type="number" bind:value={lineWidth} min="1" max="10">
            <label>Snap to Grid:</label>
            <input type="checkbox" bind:checked={$snapEnabled}>
        </div>
        <div class="canvas-container">
            <canvas id="gridCanvas" bind:this={gridCanvas} width="900" height="600"></canvas>
            <canvas id="drawCanvas" bind:this={drawCanvas} width="900" height="600"
                    on:mousedown={startDrawing}
                    on:mouseup={endDrawing}
                    on:mousemove={(e) => {
                        if (mode === "draw") {
                            draw(e);
                        } else if (mode === "eraser") {
                            erase(e);
                        }
                    }}></canvas>
        </div>
    </div>
</div>
