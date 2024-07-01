
<script>
  import { onMount } from "svelte";

  import StopIcon from "./images/stop-circle.256x256.png";
  import RecordIcon from "./images/media-record-symbolic.256x256.png";
  import PauseIcon from "./images/pause.256x256.png";
  import ResumeIcon from "./images/resume.256x208.png";
  import DownloadIcon from "./images/download.256x256.png";
  import TrashIcon from "./images/trash.224x256.png";

  import RedDotIcon from "./images/red-circle.256x256.png";
  let video;
  let recordedVideos = [];
  let stream;
  let mediaRecorder;
  let chunks = [];
  let recording = false;
  let videoURL = "";
  let timer = 0;
  let timerInterval;
  let isPause = false;

  onMount(async () => {
    video = document.querySelector("video#live");

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      video.srcObject = stream;
      video.muted = true; // Mute the video initially to prevent feedback
      video.play();
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  });

  async function startRecording() {
    chunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const videoObj = { url: URL.createObjectURL(blob), id: Date.now() };
      recordedVideos = [videoObj, ...recordedVideos];
      chunks = [];
    };
    mediaRecorder.start();
    recording = true;
    startTimer();
  }

  async function stopRecording() {
    mediaRecorder.stop();
    recording = false;
    isPause = false;
    clearInterval(timerInterval);
    timer = 0;
  }

  function saveRecording(videoURL) {
    const link = document.createElement("a");
    link.href = videoURL;
    link.download = "recording.webm";
    link.click();
  }

  function deleteRecording(videoId) {
    recordedVideos = recordedVideos.filter((video) => video.id !== videoId);
  }

  function togglePause() {
    if (recording) {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.pause();
        clearInterval(timerInterval);
        isPause = true;
      } else if (mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        startTimer();
        isPause = false;
      }
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
    }, 1000);
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 border-2 border-gray-700 rounded-md"
>
  <div class="flex flex-row justify-center w-4/5 lg:w-2/5 gap-4 mb-4 relative">
    {#if recording}
      <div class="timer-container">
        {#if !isPause}
          <img class="red-dot" src={RedDotIcon} alt="red dot" />
        {/if}
        <div class="timer-text">
          {Math.floor(timer / 60)
            .toString()
            .padStart(2, "0")}:{(timer % 60).toString().padStart(2, "0")}
        </div>
      </div>
    {/if}
    <video id="live" class="w-full rounded-md"></video>
  </div>

  <div class="flex flex-row justify-center gap-2 mt-4 section1">
    {#if recording}
      <button
        on:click={togglePause}
        class="button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow-lg flex items-center gap-2"
      >
        {#if isPause}<img
            src={ResumeIcon}
            alt="pauseicon"
            height="16px"
            width="16px"
          />Resume{:else}
          <img src={PauseIcon} alt="pauseicon" height="16px" width="16px" />
          Pause{/if}
      </button>
      <button
        on:click={stopRecording}
        class="button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg flex items-center gap-2"
      >
        <img src={StopIcon} alt="stopicon" height="16px" width="16px" />Stop
        Recording
      </button>
    {:else}
      <button
        on:click={startRecording}
        class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded shadow-lg flex items-center gap-2"
      >
        <img
          src={RecordIcon}
          alt="recordingicon"
          height="14px"
          width="14px"
        />Start Recording
      </button>
    {/if}
  </div>

  {#if recordedVideos.length > 0}
    <div class="recorded-video-section border-2 w-full rounded-md mt-6">
      <h2 class="text-xl mt-4 text-center my-2 font-semibold">
        Recorded Videos
      </h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-1 lg:gap-2 justify-between"
      >
        {#each recordedVideos as video, index}
          <div
            class="rounded-md overflow-hidden shadow-lg m-2 border-2 border-gray-700"
          >
            <video controls src={video.url} class="w-full"></video>
            <div class="flex justify-between p-2">
              <span>Recorded Video {index + 1}</span>
              <div>
                <button
                  title="delete"
                  on:click={() => deleteRecording(video.id)}
                  class="button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded shadow"
                >
                  <img
                    src={TrashIcon}
                    alt="delete"
                    height="14px"
                    width="14px"
                  />
                </button>
                <button
                  title="download"
                  on:click={() => saveRecording(video.url)}
                  class="button bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded shadow"
                >
                  <img
                    src={DownloadIcon}
                    alt="Download"
                    height="16px"
                    width="16px"
                  />
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .section1 button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background-color: #007bff;
    border: none;
    cursor: pointer;
    transition:
      transform 0.2s ease-in-out,
      background-color 0.2s ease-in-out;
  }

  .section1 button:hover {
    transform: scale(1.05);
    background-color: #0056b3;
  }

  .section1 button:active {
    transform: scale(0.95);
    background-color: #004085;
  }

  .container {
    padding: 2rem;
  }

  .timer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    height: 1.5rem;
    width: 6rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    color: white; 
    border-radius: 0.375rem; 
  }

  .red-dot {
    display: inline-block;
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background-color: red;
    border-radius: 50%;
    margin-right: 4.3rem;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
  .timer-text {
    flex: 1;
    text-align: center;
  }

  .recorded-video-section {
    border: 2px solid #2d3748; 
    padding: 1rem;
  }
</style>
