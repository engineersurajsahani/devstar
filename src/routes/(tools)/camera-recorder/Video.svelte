<script>
	import { onMount } from 'svelte';
	import CameraIcon from './icons/CameraIcon.svelte';
	import DownloadIcon from './icons/DownloadIcon.svelte';
	import RecordIcon from './icons/RecordIcon.svelte';
	import StopIcon from './icons/StopIcon.svelte';
  
	let video;
	let recordedVideo;
	let stream;
	let mediaRecorder;
	let chunks = [];
	let recording = false;
	let videoURL = '';
  
	onMount(async () => {
	  video = document.querySelector('video');
	  recordedVideo = document.getElementById('recordedVideo');
  
	  try {
		stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		video.srcObject = stream;
		video.muted = true; // Mute the video initially to prevent feedback
		video.play();
	  } catch (err) {
		console.error("Error accessing camera: ", err);
	  }
	});
  
	async function startRecording() {
	  if (document.documentElement.requestFullscreen) {
		await document.documentElement.requestFullscreen();
	  } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
		await document.documentElement.webkitRequestFullscreen();
	  } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
		await document.documentElement.msRequestFullscreen();
	  }
  
	  chunks = [];
	  mediaRecorder = new MediaRecorder(stream);
	  mediaRecorder.ondataavailable = (e) => {
		chunks.push(e.data);
	  };
	  mediaRecorder.onstop = () => {
		const blob = new Blob(chunks, { type: 'video/webm' });
		videoURL = URL.createObjectURL(blob);
	  };
	  mediaRecorder.start();
	  recording = true;
	}
  
	async function stopRecording() {
	  mediaRecorder.stop();
	  recording = false;
  
	  if (document.exitFullscreen) {
		await document.exitFullscreen();
	  } else if (document.webkitExitFullscreen) { /* Safari */
		await document.webkitExitFullscreen();
	  } else if (document.msExitFullscreen) { /* IE11 */
		await document.msExitFullscreen();
	  }
	}
  
	function saveRecording() {
	  if (!videoURL) return;
	  const link = document.createElement('a');
	  link.href = videoURL;
	  link.download = 'recording.webm';
	  link.click();
	}
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen gradient-bg p-4">
	<div class="flex flex-row justify-center w-4/5 lg:w-2/3 gap-4 mb-4 relative">
	  <div class="absolute top-2 left-2 bg-white p-2 rounded-full shadow-lg">
		<CameraIcon class="w-6 h-6 text-blue-500" />
	  </div>
	  <video class="w-11/12 md:w-1/2 lg:w-3/5 rounded-md shadow-lg"></video>
	  {#if videoURL}
		<video id="recordedVideo" src={videoURL} controls class="w-11/12 md:w-1/2 lg:w-3/5 rounded-md shadow-lg max-w-full mt-4"></video>
	  {:else}
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-11/12 md:w-1/2 lg:w-3/5 max-w-full text-white animated">
		  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
		  <g id="SVGRepo_iconCarrier"> 
			<path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
			<path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
		  </g>
		</svg>
	  {/if}
	</div>
	<div class="flex flex-row justify-center gap-2 mt-4">
	  {#if recording}
		<button on:click={stopRecording} class="button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg flex items-center gap-2">
		  <StopIcon class="w-5 h-5" /> Stop Recording
		</button>
	  {:else}
		<button on:click={startRecording} class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg flex items-center gap-2">
		  <RecordIcon class="w-5 h-5" /> Start Recording
		</button>
	  {/if}
	  {#if videoURL}
		<button on:click={saveRecording} class="button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg flex items-center gap-2">
		  <DownloadIcon class="w-5 h-5" /> Download
		</button>
	  {/if}
	</div>
  </div>
  

  







<style>
	html, body {
	  margin: 0;
	  padding: 0;
	  height: 100%;
	  font-family: 'Arial', sans-serif;
	  background-color: #f8f9fa;
	  color: #343a40;
	}
  
	svg {
	  width: 100%;
	  height: auto;
	}
  
	.button {
	  display: inline-block;
	  padding: 0.5rem 1rem;
	  font-size: 1rem;
	  font-weight: 600;
	  color: #fff;
	  background-color: #007bff;
	  border: none;
	  cursor: pointer;
	  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
	}
  
	.button:hover {
	  transform: scale(1.05);
	  background-color: #0056b3;
	}
  
	.button:active {
	  transform: scale(0.95);
	  background-color: #004085;
	}
  
	.rounded {
	  border-radius: 0.375rem;
	}
  
	.shadow-lg {
	  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
  
	.gradient-bg {
	  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
	  color: #fff;
	}
  
	.animated {
	  animation: bounce 1s infinite;
	}
  
	@keyframes bounce {
	  0%, 20%, 50%, 80%, 100% {
		transform: translateY(0);
	  }
	  40% {
		transform: translateY(-30px);
	  }
	  60% {
		transform: translateY(-15px);
	  }
	}
  
	.container {
	  padding: 2rem;
	}
  
	.card {
	  background-color: #fff;
	  border: 1px solid #e0e0e0;
	  border-radius: 0.375rem;
	  padding: 1.5rem;
	  margin-bottom: 1rem;
	  transition: box-shadow 0.2s ease-in-out;
	}
  
	.card:hover {
	  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
	}
  
	.text-center {
	  text-align: center;
	}
  
	.text-primary {
	  color: #007bff;
	}
  
	.text-secondary {
	  color: #6c757d;
	}
  
	@media (min-width: 768px) {
	  .container {
		padding: 4rem;
	  }
	}
  
	.flex {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
  
	.flex-column {
	  flex-direction: column;
	}
  
	.flex-row {
	  flex-direction: row;
	}
  
	.space-between {
	  justify-content: space-between;
	}
  </style>