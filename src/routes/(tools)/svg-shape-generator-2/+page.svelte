<script>

</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<div class="container-wrapper">
		<div class="dotted-border-container">
			<h2>Preview</h2>
		</div>
	
		<div class="slider-container">
			<div class="range-slider">
				<img src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/3angle.svg" alt="Decrease SVG Shape Angles">
				<input class="range-slider__range range-slider-angle" type="range" value="9" min="3" max="12" step="1">
				<img src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/angles.svg" alt="Increase SVG Shape Angles">
			</div>
	
			<div class="range-slider">
				<img src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/circle.svg" alt="Decrease SVG Shape Complexity">
				<input class="range-slider__range range-slider-curve" type="range" value="5" min="3" max="12" step="1">
				<img src="https://softr-assets-eu-shared.s3.eu-central-1.amazonaws.com/softr-tools/blob/assets/icons/circle-end.svg" alt="Increase SVG Shape Complexity">
			</div>
	
			<div class="button-wrapper">
				<a href="#" class="button">PNG</a>
				<a href="#" class="button">SVG</a>
			</div>
		</div>
	</div>
</div>

<style>
 body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .container-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .dotted-border-container {
    width: 100%;
    max-width: 800px;
    height: 500px;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 4px dotted #999;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px;
    overflow: auto;
  }

  .slider-container {
    width: 100%;
    max-width: 800px;
    height: 200px;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 2px solid #ccc;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .range-slider {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  .range-slider img {
    width: 40px;
    height: 40px;
  }

  .range-slider__range {
    width: 70%;
    -webkit-appearance: none;
    margin: 0 10px;
    height: 10px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    transition: opacity .15s ease-in-out;
  }

  .range-slider__range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #4CAF50;
    cursor: pointer;
    border-radius: 50%;
  }

  .range-slider__range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #4CAF50;
    cursor: pointer;
    border-radius: 50%;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .button {
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 30px;
    margin: 0 10px;
    cursor: pointer;
    text-decoration: none;
    font-size: 18px;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #45a049;
  }
</style>