<script>
	import { onMount } from "svelte";
	
	let video;
	let errorMessage = "Camera Access Denied";
	let requestMessage = "Please provide camera and mic access to use the tool";
	let permission = 'pending';
	let constraints = { video: true, audio: false };
	let videoDevices = [];
	let audioDevices = [];
	let selectedVideoDeviceId = null;
	let selectedAudioDeviceId = null;
	let canvas = null;
  
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
	  } catch (e) {
		console.error(e, "camera access denied");
		permission = 'denied';
	  }
	}
  
	function capture() {
	  const context = canvas.getContext("2d");
	  
	  canvas.width = video.videoWidth;
	  canvas.height = video.videoHeight;
	  
	  context.drawImage(video, 0, 0, canvas.width, canvas.height);
	  
	  const dataURL = canvas.toDataURL("image/png");
  
	  // Create a link element to download the image
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
  
<div class="container">
	<div class="video-container">
	  <video bind:this={video} width="600" height="480">
		<track kind="captions">
	  </video>
	  <canvas bind:this={canvas} class="hidden"></canvas>
	</div>
	<div class="controls">
	  {#if permission == 'denied'}
		<div class="error-message">
		  {errorMessage}
		</div>
	  {:else if permission == "pending"}
		<div class="request-message">
		  {requestMessage}
		</div>
	  {:else}
		<div class="button-container">
		  <button class="button" on:click={startVideo}>Start Recording</button>
		  <button class="button" on:click={() => video.pause()}>Stop Recording</button>
		  <button class="button" on:click={capture}>Snap</button>
		</div>
		<div class="device-selection">
		  <label for="video-select">Select Camera:</label>
		  <select id="video-select" on:change={handleVideoDeviceChange}>
			{#each videoDevices as device}
			<option value={device.deviceId}>{device.label || 'Camera'}</option>
			{/each}
		  </select>
		  <label for="audio-select">Select Microphone:</label>
		  <select id="audio-select" on:change={handleAudioDeviceChange}>
			{#each audioDevices as device}
			<option value={device.deviceId}>{device.label || 'Microphone'}</option>
			{/each}
		  </select>
		</div>
	  {/if}
	</div>
</div>
  
<style>
	.container {
	  display: flex;
	  flex-direction: row;
	  border: 1px solid white;
	  height: 443px;
	  background-color: #333; /* Set background color */
	  color: white;
	  padding: 10px;
	}
	
	.video-container {
	  flex: 1;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border-right: 1px solid #ef4444;
	  background-color: #222; /* Set background color for video container */
	}
	
	.controls {
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  background-color: #444; /* Set background color for controls container */
	}
	
	.button-container {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  border-bottom: 1px solid #fff;
	  margin-bottom: 20px;
	  width: 40%; /* Ensure button container takes full width */
	}
	
	.button {
	  background-color: #ef4444;
	  color: white;
	  border: none;
	  padding: 10px 20px;
	  margin: 10px;
	  cursor: pointer;
	  transition: background-color 0.3s;
	  width: 100%; /* Ensure all buttons take full width */
	  box-sizing: border-box; /* Include padding in the width calculation */
	  text-align: center; /* Center the text inside the button */
	}
	
	.button:hover {
	  background-color: #d43f3f;
	}
	
	.device-selection {
	  margin-top: 20px;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	
	.device-selection label {
	  margin: 10px 0;
	}
	
	.error-message, .request-message {
	  text-align: center;
	}
	
	.hidden {
	  display: none;
	}
</style>
