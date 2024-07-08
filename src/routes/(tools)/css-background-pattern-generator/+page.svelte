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
        } else if (patternType === 'hexagons') {
            const hexagonSize = patternContainer.clientWidth / patternSize;
            const background = `
                conic-gradient(from 90deg at 2px 2px, #0000 25%, ${backgroundColor} 0) -1px -1px,
                linear-gradient(-45deg, ${backgroundColor} 15%, ${patternColor} 0 28%, #0000 0 72%, ${patternColor} 0 85%, ${backgroundColor} 0),
                linear-gradient(45deg, ${backgroundColor} 15%, ${patternColor} 0 28%, #0000 0 72%, ${patternColor} 0 85%, ${backgroundColor} 0),
                conic-gradient(from 90deg at 40% 40%, ${backgroundColor} 25%, ${patternColor} 0)
                calc(${hexagonSize}px/-5) calc(${hexagonSize}px/-5)
            `;
            patternContainer.style.background = background;
            patternContainer.style.backgroundSize = `${hexagonSize}px ${hexagonSize}px`;
            cssCode = `
                background: ${background};
                background-size: ${hexagonSize}px ${hexagonSize}px;
            `;
        }else if (patternType === 'netV1') {
        const netSize = patternContainer.clientWidth / patternSize * 4.667;
        const background = `
          radial-gradient(farthest-side at -33.33% 50%, #0000 52%, ${patternColor} 54% 57%, #0000 59%) 0 calc(${netSize}px/2),
          radial-gradient(farthest-side at 50% 133.33%, #0000 52%, ${patternColor} 54% 57%, #0000 59%) calc(${netSize}px/2) 0,
          radial-gradient(farthest-side at 133.33% 50%, #0000 52%, ${patternColor} 54% 57%, #0000 59%),
          radial-gradient(farthest-side at 50% -33.33%, #0000 52%, ${patternColor} 54% 57%, #0000 59%),
          ${backgroundColor}
        `;
        patternContainer.style.background = background;
        patternContainer.style.backgroundSize = `calc(${netSize}px/4.667) ${netSize}px`;
        cssCode = `
                background: ${background};
                background-size: ${netSize}px ${netSize}px;
            `;
      }else if (patternType === 'netV2') {
        const netSize = 32;
        const background = `
          radial-gradient(35.36% 35.36% at 100% 25%, #0000 66%, ${patternColor} 68% 70%, #0000 72%) ${netSize}px ${netSize}px / calc(2*${netSize}px) calc(2*${netSize}px),
          radial-gradient(35.36% 35.36% at 0 75%, #0000 66%, ${patternColor} 68% 70%, #0000 72%) ${netSize}px ${netSize}px / calc(2*${netSize}px) calc(2*${netSize}px),
          radial-gradient(35.36% 35.36% at 100% 25%, #0000 66%, ${patternColor} 68% 70%, #0000 72%) 0 0 / calc(2*${netSize}px) calc(2*${netSize}px),
          radial-gradient(35.36% 35.36% at 0 75%, #0000 66%, ${patternColor} 68% 70%, #0000 72%) 0 0 / calc(2*${netSize}px) calc(2*${netSize}px),
          repeating-conic-gradient(${backgroundColor} 0 25%, #0000 0 50%) 0 0 / calc(2*${netSize}px) calc(2*${netSize}px),
          radial-gradient(#0000 66%, ${patternColor} 68% 70%, #0000 72%) 0 calc(${netSize}px/2) / ${netSize}px ${netSize}px
          ${backgroundColor}
        `;
        patternContainer.style.background = background;    
        cssCode = `
                background: ${background};
                background-size: ${netSize}px ${netSize}px;
            `;
      } else if (patternType === 'tablecloth') {
        const tablecloth=32;
        const background = `
          repeating-linear-gradient(transparent, transparent 8px, ${patternColor} 8px, ${patternColor} 12px, transparent 12px, transparent 16px, ${patternColor} 12px, ${patternColor} 32px, transparent 32px, transparent 36px, ${patternColor} 36px, ${patternColor} 40px, transparent 40px, transparent 64px),
          repeating-linear-gradient(90deg, transparent, transparent 8px, ${patternColor} 8px, ${patternColor} 12px, transparent 12px, transparent 16px, ${patternColor} 12px, ${patternColor} 32px, transparent 32px, transparent 36px, ${patternColor} 36px, ${patternColor} 40px, transparent 40px, transparent 64px),
          ${backgroundColor}
        `;
        patternContainer.style.background = background;
        patternContainer.style.backgroundBlendMode = 'multiply';
        patternContainer.style.backgroundColor = backgroundColor;
        cssCode = `
                background: ${background};
                background-size: ${tablecloth}px ${tablecloth}px;
            `;
      }  else if (patternType === 'hamper') {
        const hamper=32;
        const background = `
          conic-gradient(at 16px calc(100% - 16px), #0000 270deg, ${patternColor} 0) calc(16px + 12px) 0,
          linear-gradient(#adafff 16px, #0000 0) 0 12px,
          conic-gradient(at 16px calc(100% - 16px), #0000 90deg, #adafff 0 180deg, ${patternColor} 0),
          ${backgroundColor}
        `;
        patternContainer.style.background = background;
        patternContainer.style.backgroundSize = `calc(2*(16px + 12px)) calc(2*(16px + 12px))`;
        cssCode = `
                background: ${background};
                background-size: ${hamper}px ${hamper}px;
            `;
      }else if (patternType === 'fences') {
        const fences=32;
        patternContainer.style.background = `
          radial-gradient(27% 29% at right, #0000 83%, ${patternColor} 85%, #0000 101%) calc(32px/2) 32px,
          radial-gradient(27% 29% at left, #0000 83%, ${patternColor} 85%, #0000 101%) calc(32px/-2) 32px,
          radial-gradient(29% 27% at top, #0000 83%, ${patternColor} 85%, #0000 101%) 0 calc(32px/2),
          radial-gradient(29% 27% at bottom, #0000 83%, ${patternColor} 85%, #0000 101%) 0 calc(32px/-2),
          ${backgroundColor}
        `;
        patternContainer.style.backgroundSize = `64px 64px`;
        patternContainer.style.backgroundRepeat = 'repeat';
        cssCode = `
                background: ${background};
                background-size: ${fences}px ${fences}px;
            `;
      }else if (patternType === 'polka') {
  const dotSize = 32;
  const background = `
    conic-gradient(#47d3ff 25%, #0000 0) 0 0 / calc(2 * ${dotSize}px) calc(${dotSize}px / 9.5),
    conic-gradient(#47d3ff 25%, #0000 0) 0 0 / calc(${dotSize}px / 9.5) calc(2 * ${dotSize}px),
    repeating-conic-gradient(#0000 0 25%, #47d3ff 0 50%) ${dotSize}px 0 / calc(2 * ${dotSize}px) calc(2 * ${dotSize}px),
    radial-gradient(50% 50%, #474bff 98%, #47d3ff) 0 0 / ${dotSize}px ${dotSize}px,
    ${backgroundColor}
  `;
  patternContainer.style.background = background;
  cssCode = `
                background: ${background};
                background-size: ${dotSize}px ${dotSize}px;
            `;
}else if (patternType === 'brokenDots') {
  const dotSize = 32;
  const background = `
    radial-gradient(#474bff 49%, #0000 50%) ${dotSize}px ${dotSize}px,
    repeating-conic-gradient(from 45deg, #47d3ff 0 25%, #0000 0 50%) ${dotSize / 2}px ${dotSize / 2}px,
    radial-gradient(#474bff 49%, #0000 50%),
    radial-gradient(#474bff 49%, #0000 50%) ${dotSize}px ${dotSize}px,
    ${backgroundColor}
  `;
  patternContainer.style.background = background;
  patternContainer.style.backgroundSize = `calc(2 * ${dotSize}px) calc(2 * ${dotSize}px)`;
  cssCode = `
                background: ${background};
                background-size: ${dotSize}px ${dotSize}px;
            `;
}else if (patternType === 'connectedNodes') {
    const connectedNodes=32;
  const background = `
    radial-gradient(#adafff 24%, #0000 25%),
    radial-gradient(#fff 30%, #0000 32%) calc(32px / 2) calc(32px / 2),
    repeating-conic-gradient(from 30deg, #47d3ff 0 30deg, #474bff 0 90deg),
    ${backgroundColor}
  `;
  patternContainer.style.background = background;
  patternContainer.style.backgroundSize = `32px 32px`;
  cssCode = `
                background: ${background};
                background-size: ${connectedNodes}px ${connectedNodes}px;
            `;
}else if (patternType === 'windRose') {
    const windRose=32;
  const background = `
    conic-gradient(from -45deg at calc(100%/3) calc(100%/3), #47d3ff 90deg, #0000 0),
    conic-gradient(from -135deg at calc(100%/3) calc(2*100%/3), #47d3ff 90deg, #474bff 0 135deg, #0000 0),
    conic-gradient(from 135deg at calc(2*100%/3) calc(2*100%/3), #47d3ff 90deg, #474bff 0 135deg, #0000 0),
    conic-gradient(from 45deg at calc(2*100%/3) calc(100%/3), #47d3ff 90deg, #474bff 0 135deg, #0000 0, #47d3ff 0 225deg, #474bff 0),
    ${backgroundColor}
  `;
  patternContainer.style.background = background;
  patternContainer.style.backgroundSize = `64px 64px`;
  cssCode = `
                background: ${background};
                background-size: ${windRose}px ${windRoses}px;
            `;
}else if (patternType === 'knitting') {
    const knitting=32;
  const background = `
    conic-gradient(at 50% calc(100%/6), #474bff 60deg, #0000 0),
    conic-gradient(at calc(100%/6) 50%, #0000 240deg, #474bff 0),
    conic-gradient(from 180deg at calc(100%/6) calc(500%/6), #474bff 60deg, #0000 0),
    conic-gradient(from 180deg at calc(500%/6), #0000 240deg, #474bff 0) calc(4 * .866 * 16px) 0,
    repeating-linear-gradient(-150deg, #adafff 0 calc(100%/6), #0000 0 50%),
    repeating-linear-gradient(-30deg, #fff 0 calc(100%/6), #47d3ff 0 50%),
    ${backgroundColor}
  `;
  patternContainer.style.background = background;
  patternContainer.style.backgroundSize = `calc(6 * .866 * 16px) calc(3 * 16px)`;
  cssCode = `
                background: ${background};
                background-size: ${knitting}px ${knitting}px;
            `;
}else if (patternType === 'steps') {
    const steps=32;
  const background = `
    32px 32px / calc(2 * 32px) calc(2 * 32px) conic-gradient(at calc(500%/6) 50%, #47d3ff 25%, #0000 0),
    0 0 / calc(2 * 32px) calc(2 * 32px) conic-gradient(at calc(500%/6) 50%, #47d3ff 25%, #0000 0),
    32px 32px / calc(2 * 32px) calc(2 * 32px) conic-gradient(at calc(200%/3) 50%, #adafff 25%, #0000 0),
    0 0 / calc(2 * 32px) calc(2 * 32px) conic-gradient(at calc(200%/3) 50%, #adafff 25%, #0000 0),
    repeating-conic-gradient(#474bff 0 25%, #0000 0 50%) 0 0 / calc(2 * 32px) calc(2 * 32px),
    linear-gradient(#474bff calc(100%/3), #adafff 0 calc(200%/3), #47d3ff 0) 0 0 / 32px 32px,
    ${backgroundColor}
  `;
  patternContainer.style.background = background;
  patternContainer.style.backgroundSize = `calc(2 * 32px) calc(2 * 32px)`;
  cssCode = `
                background: ${background};
                background-size: ${steps}px ${s}px;
            `;
}
    
        // Add other patterns here with similar structure...

        // Ensure textarea is updated
        document.getElementById('css-code').value = cssCode.trim();
    }

    function shuffleColors() {
        const colors = ['#474BFF', '#47D3FF', '#ADAFFF', '#FFF', '#000', '#CCC'];
        const randomIndex1 = Math.floor(Math.random() * 6);
        const randomIndex2 = Math.floor(Math.random() * 6);
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
                <option value="netV1">Net V1</option>
                <option value="netV2">Net V2</option>
                <option value="tablecloth">Tablecloth</option>
                <option value="hamper">Hamper</option>
                <option value="fences">Fences</option>
                <option value="polka">Polka Dots</option>
                <option value="brokenDots">Broken Dots</option>
                <option value="connectedNodes">Connected Nodes</option>
                <option value="windRose">Wind Rose</option>
                <option value="knitting">Knitting</option>
                <option value="steps">Steps</option>
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
