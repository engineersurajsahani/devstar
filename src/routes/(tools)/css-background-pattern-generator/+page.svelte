<script>
    import { onMount } from "svelte";

    let patternColor = "#474BFF";
    let backgroundColor = "#47D3FF";
    let patternSize = 8;
    let patternType = "checks";
    let cssCode = '';

    function generatePattern() {
        const patternContainer = document.getElementById('pattern');
        patternContainer.innerHTML = '';
        patternContainer.style.background = 'none'; // Reset background

        const size = 32 / patternSize; // Adjust the size based on the patternSize slider

        if (patternType === 'checks') {
            const squareSize = patternContainer.clientWidth / patternSize;
            patternContainer.style.gridTemplateColumns = `repeat(${patternSize}, ${squareSize}px)`;
            patternContainer.style.gridTemplateRows = `repeat(${patternSize}, ${squareSize}px)`;
            for (let row = 0; row < patternSize; row++) {
                for (let col = 0; col < patternSize; col++) {
                    const square = document.createElement('div');
                    square.classList.add('square');
                    if ((row + col) % 2 === 0) {
                        square.style.backgroundColor = patternColor;
                    } else {
                        square.style.backgroundColor = backgroundColor;
                    }
                    patternContainer.appendChild(square);
                }
            }
            cssCode = `
                display: grid;
                grid-template-columns: repeat(${patternSize}, ${squareSize}px);
                grid-template-rows: repeat(${patternSize}, ${squareSize}px);
                .square:nth-child(odd) {
                    background-color: ${patternColor};
                }
                .square:nth-child(even) {
                    background-color: ${backgroundColor};
                }
            `;
        } else if (patternType === 'diamonds') {
            const background = `
                linear-gradient(45deg, ${patternColor} 25%, transparent 25%) -${size / 2}px 0/ ${size}px ${size}px,
                linear-gradient(135deg, ${patternColor} 25%, transparent 25%) -${size / 2}px 0/ ${size}px ${size}px,
                linear-gradient(45deg, transparent 75%, ${backgroundColor} 75%) -${size / 2}px 0/ ${size}px ${size}px,
                linear-gradient(135deg, transparent 75%, ${backgroundColor} 75%) -${size / 2}px 0/ ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'grid') {
            const background = `
                linear-gradient(${patternColor} 1px, transparent 1px) 0 0 / ${size}px ${size}px,
                linear-gradient(90deg, ${patternColor} 1px, transparent 1px) 0 0 / ${size}px ${size}px,
                ${backgroundColor}
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'dot') {
            const background = `
                radial-gradient(circle, ${patternColor} 1px, ${backgroundColor} 1px) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'crossDots') {
            const background = `
                radial-gradient(circle, ${patternColor} 1px, ${backgroundColor} 1px) 0 0 / ${size}px ${size}px,
                linear-gradient(${patternColor} 1px, transparent 1px) 0 0 / ${size}px ${size}px,
                linear-gradient(90deg, ${patternColor} 1px, transparent 1px) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'verticalLines') {
            const background = `
                linear-gradient(90deg, ${patternColor} 1px, ${backgroundColor} 1px) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'horizontalLines') {
            const background = `
                linear-gradient(${patternColor} 1px, ${backgroundColor} 1px) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'diagonalLines') {
            const background = `
                linear-gradient(45deg, ${patternColor} 25%, transparent 25%, transparent 50%, ${patternColor} 50%, ${patternColor} 75%, transparent 75%, transparent 100%)
            `;
            patternContainer.style.backgroundImage = background;
            patternContainer.style.backgroundSize = `${size}px ${size}px`;
            cssCode = `
                background-image: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'verticalStripes') {
            const background = `
                linear-gradient(90deg, ${patternColor} 50%, ${backgroundColor} 50%) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'horizontalStripes') {
            const background = `
                linear-gradient(${patternColor} 50%, ${backgroundColor} 50%) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'diagonalStripes') {
            const background = `
                linear-gradient(45deg, ${patternColor} 50%, ${backgroundColor} 50%) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        } else if (patternType === 'crosses') {
            const background = `
                linear-gradient(${patternColor} 1px, transparent 1px) 0 0 / ${size}px ${size}px,
                linear-gradient(90deg, ${patternColor} 1px, transparent 1px) 0 0 / ${size}px ${size}px
            `;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${size}px ${size}px;
            `;
        }

        // Ensure textarea is updated
        document.getElementById('css-code').value = cssCode.trim();
    }

    function shuffleColors() {
        const colors = ['#474BFF', '#47D3FF', '#ADAFFF', '#FFF', '#000', '#CCC'];
        const randomIndex1 = Math.floor(Math.random() * colors.length);
        let randomIndex2 = Math.floor(Math.random() * colors.length);
        while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.floor(Math.random() * colors.length);
        }
        patternColor = colors[randomIndex1];
        backgroundColor = colors[randomIndex2];
        generatePattern();
    }

    onMount(() => {
        generatePattern();
    });
</script>


<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
    <div class="pattern" id="pattern"></div>
    <div class="controls">
        <div class="input-group">
            <label for="pattern-type">Pattern Type:</label>
            <select bind:value={patternType} on:change={generatePattern}>
                <option value="checks">Checks</option>
                <option value="diamonds">Diamonds</option>
                <option value="grid">Grid</option>
                <option value="dot">Dot</option>
                <option value="crossDots">CrossDots</option>
                <option value="verticalLines">VerticalLines</option>
                <option value="horizontalLines">HorizontalLines</option>
                <option value="diagonalLines">DiagonalLines</option>
                <option value="verticalStripes">VerticalStripes</option>
                <option value="horizontalStripes">HorizontalStripes</option>
                <option value="diagonalStripes">DiagonalStripes</option>
                <option value="crosses">Crosses</option>
            </select>
        </div>
        <div class="input-group">
            <label for="pattern-color">Pattern Color:</label>
            <input type="color" bind:value={patternColor} on:change={generatePattern} />
        </div>
        <div class="input-group">
            <label for="background-color">Background Color:</label>
            <input type="color" bind:value={backgroundColor} on:change={generatePattern} />
        </div>
        <div class="input-group">
            <label for="pattern-size">Pattern Size:</label>
            <input type="range" min="1" max="16" bind:value={patternSize} on:change={generatePattern} />
        </div>
        <button on:click={shuffleColors}>Shuffle Colors</button>
        
    </div>
</div>
<textarea id="css-code" readonly></textarea>

<style>
    body {
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background-color: #F0F0F0;
    }

    .card {
        display: flex;
        gap: 40px;
        background-color: #fff;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        width: 80%;
        max-width: 1000px;
        box-sizing: border-box;
    }

    .pattern {
        width: 70%;
        height: 70%;
        max-width: 500px;
        max-height: 500px;
        display: grid;
        border: 2px solid #ccc;
        box-sizing: border-box;
        background: radial-gradient(27% 29% at right, #0000 83%, #474BFF 85%, #0000 101%) calc(32px/2) 32px,
                    radial-gradient(27% 29% at left, #0000 83%, #474BFF 85%, #0000 101%) calc(32px/-2) 32px,
                    radial-gradient(29% 27% at top, #0000 83%, #474BFF 85%, #0000 101%) 0 calc(32px/2),
                    radial-gradient(29% 27% at bottom, #0000 83%, #474BFF 85%, #0000 101%) 0 calc(32px/-2),
                    #47D3FF;
        background-size: 64px 64px;
        background-repeat: no-repeat;
    }

    .square {
        width: 100%;
        height: 100%;
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 30%;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .input-group label {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    }

    .input-group input[type="color"] {
        width: 100%;
        height: 30px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .input-group input[type="range"] {
        width: 100%;
    }

    .button {
        background-color: #47D3FF;
        color: rgb(255, 255, 255);
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    }

    .button:hover {
        background-color: #34B8FF;
    }

    textarea {
        width: 100%;
        height: 150px;
        margin-top: 20px;
        padding: 10px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
</style>
