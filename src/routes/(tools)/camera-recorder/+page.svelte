<script>
	import { onMount } from "svelte";
  
	let avail = 1;
	let permission = 'pending'; // 'pending', 'granted', 'denied'
	let videoData;
  
	let constraints = {
	  audio: true,
	  video: { facingMode: "user" } // Request user-facing camera
	};
  
	onMount(async () => {
	  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
		try {
		  const stream = await navigator.mediaDevices.getUserMedia(constraints);
		  videoData = document.createElement('video');
		  videoData.srcObject = stream;
		  videoData.autoplay = true;
		  videoData.playsinline = true;
		  console.log('Using srcObject');
		  permission = 'granted';
		} catch (err) {
		  console.error('Error accessing media devices:', err);
		  permission = 'denied';
		}
	  } else {
		avail = 0;
		console.log('Media devices not supported');
	  }
	});
  </script>
  
  

{#if avail}
	{#if permission === 'pending'}
		<div class="text-white">Requesting camera permission...</div>
	{:else if permission === 'granted'}
		<div id = "main" class="border border-white text-white grid grid-cols-2 h-80">
			<video bind:this={videoData} autoplay playsinline class="border border-white w-full h-full">
				<track kind="captions">
			</video>
		</div>
	{:else}
		<div class="text-white">Permission not given</div>
	{/if}
{:else}
	<div class="text-white">Camera not detected</div>
{/if}

<style>
	/* Your CSS styles here */
</style>