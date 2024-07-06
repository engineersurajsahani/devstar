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
        } else if (patternType === 'pluses') {
            const plusSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(${patternColor} 0 20%, #0000 0 40%) ${plusSize / 2}px ${plusSize / 2}px,
                repeating-linear-gradient(90deg, ${patternColor} 0 20%, #0000 0 40%) ${plusSize / 2}px ${plusSize / 2}px,
                ${backgroundColor}
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${plusSize}px ${plusSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${plusSize}px ${plusSize}px;
            `;
        } else if (patternType === 'equilateralTriangles') {
            const triangleSize = patternContainer.clientWidth / patternSize;
            const background = `
                linear-gradient(-60deg, ${backgroundColor} 23%, ${patternColor} 0 67%, ${backgroundColor} 0) 50% 0,
                linear-gradient(60deg, ${backgroundColor} 23%, ${patternColor} 0 67%, ${backgroundColor} 0) 50% 0,
                linear-gradient(60deg, ${backgroundColor} 23%, ${patternColor} 0 67%, ${backgroundColor} 0) 0 100%,
                ${backgroundColor}
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${triangleSize}px ${triangleSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${triangleSize}px ${triangleSize}px;
            `;
        } else if (patternType === 'rightTriangles') {
            const triangleSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(${patternColor} 0 50%, #0000 0) 50% 50%,
                ${backgroundColor}
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${triangleSize}px ${triangleSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${triangleSize}px ${triangleSize}px;
            `;
        }else if (patternType === 'mixedTriangles') {
            const triangleSize = patternContainer.clientWidth / patternSize;
            const background = `
                linear-gradient(135deg, ${backgroundColor} 25%, ${patternColor} 25% 50%, ${backgroundColor} 50% 75%, ${patternColor} 75%),
                linear-gradient(225deg, ${backgroundColor} 25%, ${patternColor} 25% 50%, ${backgroundColor} 50% 75%, ${patternColor} 75%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${triangleSize}px ${triangleSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${triangleSize}px ${triangleSize}px;
            `;
        }  else if (patternType === 'pies') {
            const pieSize = patternContainer.clientWidth / patternSize;
            const background = `
                conic-gradient(${patternColor} 25%, ${backgroundColor} 25% 50%, ${patternColor} 50% 75%, ${backgroundColor} 75%),
                ${backgroundColor}
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${pieSize}px ${pieSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${pieSize}px ${pieSize}px;
            `;
        } else if (patternType === 'nestedSquaresV1') {
            const squareSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(${patternColor}, ${backgroundColor} 25%, ${patternColor} 50%),
                repeating-linear-gradient(90deg, ${patternColor}, ${backgroundColor} 25%, ${patternColor} 50%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${squareSize}px ${squareSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${squareSize}px ${squareSize}px;
            `;
        }else if (patternType === 'nestedSquaresV2') {
            const squareSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(${patternColor}, ${backgroundColor} 50%),
                repeating-linear-gradient(90deg, ${patternColor}, ${backgroundColor} 50%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${squareSize}px ${squareSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${squareSize}px ${squareSize}px;
            `;
        } else if (patternType === 'snakes') {
            const snakeSize = patternContainer.clientWidth / patternSize;
            const background = `
                linear-gradient(135deg, ${backgroundColor} 50%, ${patternColor} 50%),
                linear-gradient(225deg, ${backgroundColor} 50%, ${patternColor} 50%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${snakeSize}px ${snakeSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${snakeSize}px ${snakeSize}px;
            `;
        }  else if (patternType === 'bars') {
            const barSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(${patternColor}, ${backgroundColor} 50%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${barSize}px ${barSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${barSize}px ${barSize}px;
            `;
        } else if (patternType === 'longBars') {
            const barSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(${patternColor}, ${backgroundColor} 100%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${barSize}px ${barSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${barSize}px ${barSize}px;
            `;
        }else if (patternType === 'postIt') {
            const postItSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(135deg, ${backgroundColor} 25%, ${patternColor} 25% 50%, ${backgroundColor} 50% 75%, ${patternColor} 75%),
                repeating-linear-gradient(225deg, ${backgroundColor} 25%, ${patternColor} 25% 50%, ${backgroundColor} 50% 75%, ${patternColor} 75%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${postItSize}px ${postItSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${postItSize}px ${postItSize}px;
            `;
        }else if (patternType === 'postIt') {
            const postItSize = patternContainer.clientWidth / patternSize;
            const background = `
                repeating-linear-gradient(135deg, ${backgroundColor} 25%, ${patternColor} 25% 50%, ${backgroundColor} 50% 75%, ${patternColor} 75%),
                repeating-linear-gradient(225deg, ${backgroundColor} 25%, ${patternColor} 25% 50%, ${backgroundColor} 50% 75%, ${patternColor} 75%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${postItSize}px ${postItSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${postItSize}px ${postItSize}px;
            `;
        } else if (patternType === 'mountains') {
            const mountainSize = patternContainer.clientWidth / patternSize;
            const background = `
                linear-gradient(135deg, ${patternColor} 50%, ${backgroundColor} 50%),
                linear-gradient(225deg, ${patternColor} 50%, ${backgroundColor} 50%)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${mountainSize}px ${mountainSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${mountainSize}px ${mountainSize}px;
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
                 <option value="hexagons">Hexagons</option>
               <option value="pluses">Pluses</option>
                <option value="equilateralTriangles">Equilateral Triangles</option>
                 <option value="rightTriangles">Right Triangles</option>
                 <option value="mixedTriangles">Mixed Triangles</option>
                 <option value="pies">Pies</option>
                <option value="nestedSquaresV1">Nested Squares V1</option>
                 <option value="nestedSquaresV2">Nested Squares V2</option>
                   <option value="snakes">Snakes</option>
                  <option value="bars">Bars</option>
                <option value="longBars">Long Bars</option>
                <option value="postIt">Post-It</option>
               <option value="mountains">Mountains</option>
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
        color: white;
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
