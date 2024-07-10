<script>
  import { onMount } from "svelte";

  let width = 500;
  let height = 500;
  let shape = "polygon";
  let clipPathValue = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
  let backgroundImage = "";

  const shapes = {
    triangle: "polygon(50% 0%, 100% 100%, 0% 100%)",
    circle: "circle(50% at 50% 50%)",
    rectangle: "inset(0 0 0 0 round 20px)",
    polygon: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    ellipse: "ellipse(50% 50% at 50% 50%)",
    star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    octagon:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  };

  function updateWidth(event) {
    width = event.target.value;
  }

  function updateHeight(event) {
    height = event.target.value;
  }

  function updateShape(event) {
    shape = event.target.value;
    generateClipPath();
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        backgroundImage = `url(${e.target.result})`;
      };
      reader.readAsDataURL(file);
    }
  }

  function generateClipPath() {
    clipPathValue = shapes[shape];
  }

  onMount(() => {
    generateClipPath();
  });
</script>

<main>
  <section class="generator">
    <h2 class="text-white text-2xl font-bold">Generate Clip Path</h2>
    <form>
      <div class="upload-options">
        <label>
          <input type="radio" name="uploadType" value="upload" checked />
          Upload Image
        </label>
        <!-- <label>
					<input type="radio" name="uploadType" value="url">
					Provide URL
				</label> -->
      </div>

      <label for="image">Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        on:change={handleImageUpload}
      />

      <!-- <label for="imageUrl" style="display: none;">Image URL:</label>
			<input type="url" id="imageUrl" name="imageUrl" style="display: none;"> -->

      <label for="shape">Clip Path Shape:</label>
      <select
        id="shape"
        name="shape"
        bind:value={shape}
        on:change={updateShape}
        class="text-black"
      >
        <option value="triangle">Triangle</option>
        <option value="circle">Circle</option>
        <option value="rectangle">Rectangle</option>
        <option value="polygon">Polygon</option>
        <option value="ellipse">Ellipse</option>
        <option value="star">Star</option>
        <option value="diamond">Diamond</option>
        <option value="hexagon">Hexagon</option>
        <option value="pentagon">Pentagon</option>
        <option value="octagon">Octagon</option>
      </select>

      <label for="width">Width:</label>
      <span>{width}px</span>
      <input
        type="range"
        id="width"
        name="width"
        min="100"
        max="1000"
        bind:value={width}
        on:input={updateWidth}
      />

      <label for="height">Height:</label>
      <span>{height}px</span>
      <input
        type="range"
        id="height"
        name="height"
        min="100"
        max="1000"
        bind:value={height}
        on:input={updateHeight}
      />
    </form>
    <div class="clip-path-preview">
      <div
        class="clip-path"
        style="clip-path: {clipPathValue}; width: {width}px; height: {height}px; background-image: {backgroundImage};"
      ></div>
    </div>
    <div class="code">
      <h2>Generated CSS</h2>
      <pre>clip-path: {clipPathValue}; width: {width}px; height: {height}px;</pre>
    </div>
  </section>
</main>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  main {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-image: url("back.png");
    background-position: center;
    background-size: cover;
    color: white;
  }

  .generator {
    max-width: 1200px;
    margin: 40px auto;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    overflow: auto;
    display: flex;
    align-items: center;
    padding: 35px;
  }

  @media (max-width: 768px) {
    .generator {
      max-width: 90%;
      margin: 20px auto;
    }
  }

  @media (max-width: 480px) {
    .generator {
      max-width: 80%;
      margin: 10px auto;
    }
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }

  #shape {
    display: block;
    margin: auto;
    padding: 5px 8px;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  #shape:hover {
    cursor: pointer;
  }

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #ddd;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    margin-bottom: 20px;
    cursor: pointer;
  }

  input[type="range"]:hover {
    opacity: 1;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ff01cf;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  input[type="range"]::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ff01cf;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  input[type="range"]::-webkit-slider-thumb:hover,
  input[type="range"]::-moz-range-thumb:hover {
    background: #e600b9;
  }

  input[type="range"]::-ms-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ff01cf;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    height: 15px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type="file"],
  input[type="url"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    background-color: #fff;
    color: #333;
    font-size: 12px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }
  input[type="file"]:hover {
    background-color: #f1f1f1;
  }

  input[type="file"]::file-selector-button {
    background-color: #ff01cf;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  input[type="file"]::file-selector-button:hover {
    background-color: #e600b9;
  }

  select {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  select:hover {
    background-color: #f1f1f1;
  }

  option {
    color: #333;
    background-color: #fff;
  }

  .clip-path-preview {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 3px dashed #ff01cf;
    margin-bottom: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    padding: 20px;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .clip-path {
    min-width: 50%;
    min-height: 50%;
    background-color: lightgrey;
    transition: all 0.3s ease;
    background-size: cover;
    background-position: center;
  }

  .code {
    background-color: #f9f9f9;
    padding: 20px;
    color: #000000;
    border: 2px solid #ff01cf;
    border-radius: 10px;
    margin-top: 20px;
    overflow: auto;
    max-height: 200px;
    scrollbar-width: none;
    font-weight: bold;
  }

  .code::-webkit-scrollbar {
    display: none;
  }

  pre {
    margin: 0;
    font-family: "Courier New";
    white-space: pre-wrap;
    text-align: left;
  }

  .upload-options {
    margin-bottom: 10px;
  }

  .upload-options label {
    margin-right: 10px;
  }

  /* #imageUrl {
	  display: none;
	} */
</style>
