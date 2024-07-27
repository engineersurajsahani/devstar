<script>
	import { onMount } from "svelte";
  
	let video;
	let canvas = null;
	let mediaRecorder;
	let recordedChunks = [];
	let permission = 'pending';
	let errorMessage = "Camera Access Denied";
	let requestMessage = "Please provide camera and mic access to use the tool";
	let constraints = { video: true, audio: true };
	let videoDevices = [];
	let audioDevices = [];
	let selectedVideoDeviceId = null;
	let selectedAudioDeviceId = null;
	let isRecording = false;
  
	async function getDeviceList() {
	  const devices = await navigator.mediaDevices.enumerateDevices();
	  videoDevices = devices.filter(device => device.kind == "videoinput");
	  audioDevices = devices.filter(device => device.kind == "audioinput");
  
	  if (videoDevices.length > 0) {
		selectedVideoDeviceId = videoDevices[0].deviceId;
	  }
	  if (audioDevices.length > 0) {
		selectedAudioDeviceId = audioDevices[0].deviceId;
	  }
	}
  
	async function startVideo() {
	  try {
		constraints.video = { deviceId: selectedVideoDeviceId ? { exact: selectedVideoDeviceId } : undefined };
		constraints.audio = { deviceId: selectedAudioDeviceId ? { exact: selectedAudioDeviceId } : undefined };
  
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		video.srcObject = stream;
		video.play();
		permission = 'granted';
  
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = handleDataAvailable;
	  } catch (e) {
		console.error(e, "camera access denied");
		permission = 'denied';
	  }
	}
  
	function handleDataAvailable(event) {
	  if (event.data.size > 0) {
		recordedChunks.push(event.data);
	  }
	}
  
	function startRecording() {
	  isRecording = true;
	  recordedChunks = [];
	  mediaRecorder.start();
	}
  
	function stopRecording() {
	  isRecording = false;
	  mediaRecorder.stop();
	  mediaRecorder.onstop = () => {
		const blob = new Blob(recordedChunks, { type: 'video/webm' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.download = 'recording.webm';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	  };
	}
  
	function capture() {
	  const context = canvas.getContext("2d");
	  canvas.width = video.videoWidth;
	  canvas.height = video.videoHeight;
	  context.drawImage(video, 0, 0, canvas.width, canvas.height);
	  const dataURL = canvas.toDataURL("image/png");
	  const link = document.createElement("a");
	  link.href = dataURL;
	  link.download = "snapshot.png";
	  link.click();
	}
  
	onMount(async () => {
	  await getDeviceList();
	  await startVideo();
	});
  
	function handleVideoDeviceChange(event) {
	  selectedVideoDeviceId = event.target.value;
	  startVideo();
	}
  
	function handleAudioDeviceChange(event) {
	  selectedAudioDeviceId = event.target.value;
	  startVideo();
	}
  </script>
  
  <div class="card p-8 relative mx-auto max-w-screen-xl overflow-hidden rounded-lg grid grid-cols-2 gap-10">
	<div>
	  <video class="rounded-lg" bind:this={video} controls muted width="600" height="480">
		<track kind="captions">
	  </video>
	  <canvas bind:this={canvas} class="hidden"></canvas>
	</div>
	<div>
	  {#if permission == 'denied'}
		<div class="dark:text-white">
		  {errorMessage}
		</div>
	  {:else if permission == "pending"}
		<div class="dark:text-white">
		  {requestMessage}
		</div>
	  {:else}
		<div>
		  <label for="video-select" class="dark:text-white">Select Camera:</label>
		  <select id="video-select" class="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" on:change={handleVideoDeviceChange}>
			{#each videoDevices as device}
			  <option value={device.deviceId}>{device.label}</option>
			{/each}
		  </select>
		  <label for="audio-select" class="dark:text-white">Select Microphone:</label>
		  <select id="audio-select" class="mb-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" on:change={handleAudioDeviceChange}>
			{#each audioDevices as device}
			  <option value={device.deviceId}>{device.label}</option>
			{/each}
		  </select>
		</div>
		<div class="grid grid-cols-2 gap-y-10 gap-x-5">
			{#if isRecording == false}
				<button class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg" on:click={startRecording}>Start Recording</button>
				<button class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg" on:click={stopRecording}>Stop Recording</button>
			{:else}
				<button class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800 rounded-lg" on:click={startRecording}>Start Recording</button>
				<button class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800 rounded-lg" on:click={stopRecording}>Stop Recording</button>
			{/if}
			<button class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg" on:click={capture}>Snap</button>
		  </div>
	  {/if}
	</div>
  </div>
  
  <style>
  </style>
  