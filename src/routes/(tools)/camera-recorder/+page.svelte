<script>
	import { onMount } from 'svelte';
	let video;
	let canvas;
	let photo;
	let stream;
	let imageData = '';
	let altText = 'Captured Image';
	let photos = [];
  
	onMount(async () => {
	  video = document.querySelector('video');
	  canvas = document.querySelector('canvas');
	  photo = document.getElementById('photo');
  
	  try {
		stream = await navigator.mediaDevices.getUserMedia({ video: true });
		video.srcObject = stream;
		video.play();
	  } catch (err) {
		console.error("Error accessing camera: ", err);
	  }
	});
  
	function takePicture() {
	  const context = canvas.getContext('2d');
	  if (video) {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		imageData = canvas.toDataURL('image/png');
		photos = [{ src: imageData, alt: altText }, ...photos];
	  }
	}
  
	function savePicture(src) {
	  const link = document.createElement('a');
	  link.href = src;
	  link.download = 'photo.png';
	  link.click();
	}
  
	function deletePicture(index) {
	  photos = photos.filter((_, i) => i !== index);
	}
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
	<div class="flex flex-row justify-between items-center w-full mb-4">
	  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-white">
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
		<g id="SVGRepo_iconCarrier"> 
		  <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
		  <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
		</g>
	  </svg>
	</div>
  
	<div class="flex flex-row justify-center w-4/5 lg:w-2/3 gap-2 mb-4 relative">
	  <video class="w-11/12 md:w-1/2 lg:w-3/5 rounded-md shadow-md"></video>
	  <canvas class="hidden"></canvas>
	  <button on:click={takePicture} class="absolute bottom-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Take Picture</button>
	</div>
	<div class="flex flex-wrap justify-center gap-4">
		{#each photos as { src, alt }, index}
		  <div class="relative">
			<img src={src} alt={alt} class="w-32 h-32 object-cover rounded-md shadow-md"/>
			<div class="absolute top-0 right-0 flex gap-1 m-1">
			  <button on:click={() => savePicture(src)} class="bg-green-500 hover:bg-green-700 text-white font-bold p-1 rounded-full">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				  <path d="M12 19V5m-7 7l7-7 7 7" />
				</svg>
			  </button>
			  <button on:click={() => deletePicture(index)} class="bg-gray-500 hover:bg-gray-700 text-white font-bold p-1 rounded-full">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				  <path d="M3 6h18M6 6v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6m-4 0V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2" />
				</svg>
			  </button>
			</div>
		  </div>
		{/each}
	  </div>
  </div>
	  