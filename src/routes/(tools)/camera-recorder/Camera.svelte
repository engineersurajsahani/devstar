<script>
	import { onMount } from "svelte";
	let video;
	let canvas;
	let photo;
	let stream;
	let imageData = "";
	let altText = "Captured Image";
	let photos = [];
  
	onMount(async () => {
	  video = document.querySelector("video");
	  canvas = document.querySelector("canvas");
	  photo = document.getElementById("photo");
  
	  try {
		stream = await navigator.mediaDevices.getUserMedia({ video: true });
		video.srcObject = stream;
		video.play();
	  } catch (err) {
		console.error("Error accessing camera: ", err);
	  }
	});
  
	function takePicture() {
	  const context = canvas.getContext("2d");
	  if (video) {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		imageData = canvas.toDataURL("image/png");
		photos = [{ src: imageData, alt: altText }, ...photos];
	  }
	}
  
	function savePicture(src) {
	  const link = document.createElement("a");
	  link.href = src;
	  link.download = "photo.png";
	  link.click();
	}
  
	function deletePicture(index) {
	  photos = photos.filter((_, i) => i !== index);
	}
  </script>
  
  <div
	class="container flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4"
  >
	<div class="flex flex-row justify-between items-center w-full mb-4"></div>
  
	<div class="flex flex-row justify-center w-4/5 lg:w-2/3 gap-2 mb-4 relative">
	  <video class="w-11/12 md:w-1/2 lg:w-3/5 rounded-md shadow-md"></video>
	  <canvas class="hidden"></canvas>
	  <button
		on:click={takePicture}
		class="absolute bottom-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>Take Picture</button
	  >
	</div>
  
	<div class="photos-section rounded-md">
	  <div class="heading"><strong>Captured Images</strong></div>
	  <div class="flex flex-wrap justify-center gap-4 rounded-md">
		{#each photos as { src, alt }, index}
		  <div class="relative">
			<img
			  {src}
			  {alt}
			  class="w-32 h-32 object-cover rounded-md shadow-md"
			/>
			<div class="absolute top-0 right-0 flex gap-1 m-1">
			  <button
				on:click={() => savePicture(src)}
				class="bg-green-500 hover:bg-green-700 text-white font-bold p-1 rounded-sm"
			  >
				<svg
				  xmlns="http://www.w3.org/2000/svg"
				  class="h-6 w-6"
				  viewBox="0 0 24 24"
				  fill="none"
				  stroke="currentColor"
				  stroke-width="2"
				  stroke-linecap="round"
				  stroke-linejoin="round"
				>
				  <path d="M12 5v14m7-7l-7 7-7-7" />
				</svg>
			  </button>
			  <button
				on:click={() => deletePicture(index)}
				class="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded-sm"
			  >
				<svg
				  xmlns="http://www.w3.org/2000/svg"
				  class="h-6 w-6"
				  viewBox="0 0 24 24"
				  fill="none"
				  stroke="currentColor"
				  stroke-width="2"
				>
				  <path
					d="M3 6h18M6 6v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6m-4 0V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2"
				  />
				</svg>
			  </button>
			</div>
		  </div>
		{/each}
	  </div>
	</div>
  </div>
  
  <style>
	.container {
	  border: 2px solid #4b5563;
	  padding: 1rem;
	}
  
	.photos-section {
	  border: 2px solid #4b5563;
	  padding: 1rem;
	  margin-top: 1rem;
	  border-radius: 0.5rem;
	}
  
	.heading {
	  color: white;
	  font-size: 1rem;
	  margin-bottom: 0.5rem;
	  text-align: center;
	}
  </style>