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
        } else if (patternType === 'candy') {
            const background = `
                radial-gradient(25% 25% at 25% 25%, #474bff 99%, #0000 101%) ${patternSize}px ${patternSize}px/calc(2*${patternSize}px) calc(2*${patternSize}px),
                radial-gradient(25% 25% at 25% 25%, #474bff 99%, #0000 101%) 0 0/calc(2*${patternSize}px) calc(2*${patternSize}px),
                radial-gradient(50% 50%, #adafff 98%, #0000) 0 0/${patternSize}px ${patternSize}px,
                repeating-conic-gradient(#adafff 0 25%, #474bff 0 50%) calc(.5*${patternSize}px) 0/calc(2*${patternSize}px) ${patternSize}px`;
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${patternSize}px ${patternSize}px;
            `;
        } else if (patternType === 'nested-cubes') {
            const background = `
                conic-gradient(from 0deg at calc(500%/6) calc(100%/3), #fff 0 120deg, #0000 0),
          conic-gradient(from -120deg at calc(100%/6) calc(100%/3), #adafff 0 120deg, #0000 0),
          conic-gradient(from 120deg at calc(100%/3) calc(500%/6), #474bff 0 120deg, #0000 0),
          conic-gradient(from 120deg at calc(200%/3) calc(500%/6), #474bff 0 120deg, #0000 0),
          conic-gradient(from -180deg at calc(100%/3) 50%, #adafff 60deg, #474bff 0 120deg, #0000 0),
          conic-gradient(from 60deg at calc(200%/3) 50%, #474bff 60deg, #fff 0 120deg, #0000 0),
          conic-gradient(from -60deg at 50% calc(100%/3), #474bff 120deg, #adafff 0 240deg, #fff 0)`;
                
            patternContainer.style.background = background;
            cssCode = `
                background: ${background};
                background-size: ${patternSize}px ${patternSize}px;
            `;
        }else if (patternType === 'adjacent-cubes-v1') {
        patternContainer.style.backgroundImage = `
          linear-gradient(30deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(150deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(30deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(150deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(60deg, rgba(71,75,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(71,75,255,0.5)),
          linear-gradient(60deg, rgba(71,75,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(71,75,255,0.5))`;
        patternContainer.style.backgroundSize = '64px 112px';
        patternContainer.style.backgroundPosition = '0 0, 0 0, 32px 56px, 32px 56px, 0 0, 32px 56px';
        patternContainer.style.backgroundColor = backgroundColor;
        cssCode = `
                linear-gradient(30deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(150deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(30deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(150deg, #474bff 12%, transparent 12.5%, transparent 87%, #474bff 87.5%, #474bff),
          linear-gradient(60deg, rgba(71,75,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(71,75,255,0.5)),
          linear-gradient(60deg, rgba(71,75,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(71,75,255,0.5))`;
            
      }else if (patternType === 'adjacent-cubes-v2') {
        patternContainer.style.background = `
          repeating-conic-gradient(from 30deg, #0000 0 120deg, #fff 0 180deg) 64px 36.928px,
          repeating-conic-gradient(from 30deg, #474bff 0 60deg, #adafff 0 120deg, #fff 0 180deg)`;
        patternContainer.style.backgroundSize = '128px 74px';
        patternContainer.style.backgroundColor = backgroundColor;
        cssCode = `
               repeating-conic-gradient(from 30deg, #0000 0 120deg, #fff 0 180deg) 64px 36.928px,
          repeating-conic-gradient(from 30deg, #474bff 0 60deg, #adafff 0 120deg, #fff 0 180deg)`;
      }else if (patternType === 'waves') {
        patternContainer.style.backgroundImage = `
          repeating-radial-gradient(circle at 0 0, transparent 0, #47d3ff 32px),
          repeating-linear-gradient(#474bff, #474bff)`;
        patternContainer.style.backgroundColor = backgroundColor;
         cssCode = `
         repeating-radial-gradient(circle at 0 0, transparent 0, #47d3ff 32px),
          repeating-linear-gradient(#474bff, #474bff)`;
      }else if (patternType === 'waterdrop') {
        patternContainer.style.backgroundImage = `
          radial-gradient(circle at center center, #474bff, #47d3ff),
          repeating-radial-gradient(circle at center center, #474bff, #474bff, 32px, transparent 64px, transparent 32px)`;
        patternContainer.style.backgroundBlendMode = "multiply";
        patternContainer.style.backgroundColor = backgroundColor;
        cssCode = ` radial-gradient(circle at center center, #474bff, #47d3ff),
          repeating-radial-gradient(circle at center center, #474bff, #474bff, 32px, transparent 64px, transparent 32px)`;
       
      } else if (patternType === 'buildings') {
        patternContainer.style.background = `
          conic-gradient(from -60deg at 50% calc(100%/3), #474bff 0 120deg, #0000 0),
          conic-gradient(from 120deg at 50% calc(200%/3), #474bff 0 120deg, #0000 0),
          conic-gradient(from 60deg at calc(200%/3), #474bff 60deg, #adafff 0 120deg, #0000 0),
          conic-gradient(from 180deg at calc(100%/3), #fff 60deg, #474bff 0 120deg, #0000 0),
          linear-gradient(90deg, #fff calc(100%/6), #adafff 0 50%, #fff 0 calc(500%/6), #adafff 0)`;
        patternContainer.style.backgroundSize = '111px 64px';
        patternContainer.style.backgroundColor = backgroundColor;
        cssCode = `  conic-gradient(from -60deg at 50% calc(100%/3), #474bff 0 120deg, #0000 0),
          conic-gradient(from 120deg at 50% calc(200%/3), #474bff 0 120deg, #0000 0),
          conic-gradient(from 60deg at calc(200%/3), #474bff 60deg, #adafff 0 120deg, #0000 0),
          conic-gradient(from 180deg at calc(100%/3), #fff 60deg, #474bff 0 120deg, #0000 0),
          linear-gradient(90deg, #fff calc(100%/6), #adafff 0 50%, #fff 0 calc(500%/6), #adafff 0)`;
      } else if (patternType === 'discrete-cubes') {
        patternContainer.style.background = `
          linear-gradient(135deg, #47d3ff 16.66%, transparent 0 83.33%, #47d3ff 0),
          conic-gradient(from 45deg at 66.66% 33.33%, #474bff 135deg, rgba(71,75,255,0.75) 0% 225deg, rgba(71,75,255,0.5) 0%)`;
        patternContainer.style.backgroundSize = '64px 64px';
        patternContainer.style.backgroundColor = backgroundColor;
         cssCode = ` linear-gradient(135deg, #47d3ff 16.66%, transparent 0 83.33%, #47d3ff 0),
          conic-gradient(from 45deg at 66.66% 33.33%, #474bff 135deg, rgba(71,75,255,0.75) 0% 225deg, rgba(71,75,255,0.5) 0%)`;
       
      } else if (patternType === 'rooms') {
        patternContainer.style.background = `
          conic-gradient(from -116.36deg at 25% 75%, #47d3ff 52.72deg, #0000 0),
          conic-gradient(from -116.36deg at 25% 75%, #47d3ff 52.72deg, #0000 0) calc(3*32px) calc(32px/2),
          conic-gradient(from 63.43deg at 75% 75%, #47d3ff 52.72deg, #0000 0),
          conic-gradient(from 63.43deg at 75% 75%, #47d3ff 52.72deg, #0000 0) calc(3*32px) calc(32px/2),
          conic-gradient(#adafff 63.43deg, #474bff 0 116.36deg, #adafff 0 180deg, #474bff 0 243.43deg, #adafff 0 296.15deg, #474bff 0)`;
        patternContainer.style.backgroundSize = '64px 32px';
        patternContainer.style.backgroundColor = backgroundColor;
         cssCode = `conic-gradient(from -116.36deg at 25% 75%, #47d3ff 52.72deg, #0000 0),
          conic-gradient(from -116.36deg at 25% 75%, #47d3ff 52.72deg, #0000 0) calc(3*32px) calc(32px/2),
          conic-gradient(from 63.43deg at 75% 75%, #47d3ff 52.72deg, #0000 0),
          conic-gradient(from 63.43deg at 75% 75%, #47d3ff 52.72deg, #0000 0) calc(3*32px) calc(32px/2),
          conic-gradient(#adafff 63.43deg, #474bff 0 116.36deg, #adafff 0 180deg, #474bff 0 243.43deg, #adafff 0 296.15deg, #474bff 0)`;
        
      } else if (patternType === 'tubes') {
        patternContainer.style.background = `
          linear-gradient(145deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%),
          linear-gradient(145deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%) calc(32px) 64px,
          linear-gradient(35deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%),
          linear-gradient(35deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%) calc(32px) 64px,
          conic-gradient(from -90deg at 37.5% 50%, #0000 75%, #adafff 0) calc(32px/4) 0,
          conic-gradient(from -90deg at 37.5% 50%, #0000 75%, #fff 0) calc(32px) 0,
          linear-gradient(90deg, #fff 38%, #adafff 0 50%, #fff 0 62%, #adafff 0)`;
        patternContainer.style.backgroundSize = '64px calc(2*64px/3)';
         cssCode = `linear-gradient(145deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%),
          linear-gradient(145deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%) calc(32px) 64px,
          linear-gradient(35deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%),
          linear-gradient(35deg, #adafff 10%, #474bff 10.5% 19%, #0000 19.5% 80.5%, #474bff 81% 89.5%, #fff 90%) calc(32px) 64px,
          conic-gradient(from -90deg at 37.5% 50%, #0000 75%, #adafff 0) calc(32px/4) 0,
          conic-gradient(from -90deg at 37.5% 50%, #0000 75%, #fff 0) calc(32px) 0,
          linear-gradient(90deg, #fff 38%, #adafff 0 50%, #fff 0 62%, #adafff 0)`;
      } else if (patternType === 'stairs') {
        patternContainer.style.background = `
          conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0),
          conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0) 32px 32px,
          conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0) calc(2*32px) calc(2*32px),
          conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0) calc(3*32px) calc(3*32px),
          repeating-linear-gradient(135deg, #adafff 0 12.5%, #474bff 0 25%)`;
        patternContainer.style.backgroundSize = 'calc(4*32px) calc(4*32px)';
         cssCode = `conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0),
          conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0) 32px 32px,
          conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0) calc(2*32px) calc(2*32px),
          conic-gradient(at 50% 25%, #0000 75%, #47d3ff 0) calc(3*32px) calc(3*32px),
          repeating-linear-gradient(135deg, #adafff 0 12.5%, #474bff 0 25%)`;
      }

        // Ensure textarea is updated
        document.getElementById('css-code').value = cssCode.trim();
    }

    function shuffleColors() {
        const colors = ['#474BFF', '#47D3FF', '#F79474', '#74C6F7', '#85C57F', '#F29981'];
        const randomIndex1 = Math.floor(Math.random() * colors.length);
        const randomIndex2 = Math.floor(Math.random() * colors.length);
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
                <option value="candy">Candy</option>
                <option value="nested-cubes">Nested Cubes</option>
                <option value="adjacent-cubes-v1">Adjacent Cubes V1</option>
                <option value="adjacent-cubes-v2">Adjacent Cubes V2</option>
          <option value="waves">Waves</option>
          <option value="waterdrop">Water Drop</option>
          <option value="buildings">Buildings</option>
          <option value="discrete-cubes">Discrete Cubes</option>
          <option value="rooms">Rooms</option>
          <option value="tubes">Tubes</option>
          <option value="stairs">Stairs</option>
            </select>
        </div>
        <div class="input-group">
            <label for="pattern-color">Pattern Color:</label>
            <input type="color" bind:value={patternColor} on:input={generatePattern}>
        </div>
        <div class="input-group">
            <label for="background-color">Background Color:</label>
            <input type="color" bind:value={backgroundColor} on:input={generatePattern}>
        </div>
        <div class="input-group">
            <label for="pattern-size">Pattern Size:</label>
            <input type="range" min="1" max="32" bind:value={patternSize} on:input={generatePattern}>
        </div>
        <button class="button" on:click={shuffleColors}>Shuffle Colors</button>
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
