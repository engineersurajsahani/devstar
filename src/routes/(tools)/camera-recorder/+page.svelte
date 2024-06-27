<script>
  import { onMount } from 'svelte';
  let video;
  let canvas;
  let photo;
  let stream;
  let imageData = ''; // Initialize as an empty string
  let altText = 'Captured Image';

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
    }
  }

  function savePicture() {
    if (!imageData) return;
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'photo.png';
    link.click();
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
  <div >
    <video class="w-11/12 md:w-1/2 lg:w-3/5 rounded-md shadow-md"></video>
    <canvas class="hidden"></canvas>
    {#if imageData}
      <img id="photo" src={imageData} alt={altText} />
    {:else}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-11/12 md:w-1/2 lg:w-3/5 max-w-full">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
          <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
          <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
        </g>
      </svg>
    {/if}
  </div>
  <div >
    <button on:click={takePicture} >
      Take Picture
    </button>
    <button on:click={savePicture} >
      Download
    </button>
  </div>
</div>
