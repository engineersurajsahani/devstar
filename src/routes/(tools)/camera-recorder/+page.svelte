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
	let canvas = null
  
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
		//constraints.video = { deviceId: selectedVideoDeviceId ? { exact: selectedVideoDeviceId } : undefined };
		//constraints.audio = { deviceId: selectedAudioDeviceId ? { exact: selectedAudioDeviceId } : undefined };
		
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		video.srcObject = stream;
		video.play();
		permission = 'granted';
	  } catch (e) {
		console.error(e, "camera access denied");
		permission = 'denied';
	  }
	}
  
	function capture(){
		const context = canvas.getContext("2d")
		
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		
		//const data = canvas.toDataURL("image/png");
		//Photo.setAttribute("src", data)

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
  
  <div class="border h-[443px] border-white grid grid-cols-2">
	<div class="border-r border-red-500">
	  <video bind:this={video} width="600" height="480">
		<track kind="captions">
	  </video>
	  <canvas bind:this={canvas} class="hidden"></canvas>
	</div>
	<div>
	  {#if permission == 'denied'}
		<div class="text-white text-center">
		  {errorMessage}
		</div>
	  {:else if permission == "pending"}
		<div class="text-white text-center">
		  {requestMessage}
		</div>
	  {:else}
		<div>
		  <div class="place-content-center border-b grid grid-rows-3">
			<button class="border text-white block m-2">Start Recording</button>
			<button class="border text-white block m-2">Stop Recording</button>
			<button class="border text-white block m-2" on:click={capture}>Snap</button>
		  </div>
		  <div class="">
			<div class="overflow-auto mt-10">
				<label for="video-select" class="text-white">Select Camera:</label>
				<select id="video-select" on:change={handleVideoDeviceChange}>
					{#each videoDevices as device}
					<option value={device.deviceId}>{device.label || 'Camera'}</option>
					{/each}
				</select>
			</div>
			<div class="overflow-auto mt-10">	
				<label for="audio-select" class="text-white">Select Microphone:</label>
				<select id="audio-select" on:change={handleAudioDeviceChange}>
					{#each audioDevices as device}
					<option value={device.deviceId}>{device.label || 'Microphone'}</option>
					{/each}
				</select>
			</div>
		  </div>
		</div>
	  {/if}
	</div>
  </div>
  
  <style>
	/* Add your styling here */
  </style>
  