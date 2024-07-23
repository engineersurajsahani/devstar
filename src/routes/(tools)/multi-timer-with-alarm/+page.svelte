<script>
	import { onMount } from 'svelte';
  
	// Timer logic
	let timers = [];
	let newTimerName = '';
	let newTimerDuration = 15; // Default 15 minutes
	let timerId = 0;
  
	function addTimer() {
	  if (newTimerName && newTimerDuration > 0) {
		timers = [
		  ...timers,
		  {
			id: timerId++,
			name: newTimerName,
			duration: newTimerDuration * 60, // Convert minutes to seconds
			remaining: newTimerDuration * 60,
			running: false,
			interval: null
		  }
		];
		newTimerName = '';
		newTimerDuration = 15; // Reset duration
	  }
	}
  
	function startTimer(id) {
	  const timer = timers.find(t => t.id === id);
	  if (timer && !timer.running) {
		timer.running = true;
		timer.interval = setInterval(() => {
		  if (timer.remaining > 0) {
			timer.remaining -= 1;
		  } else {
			clearInterval(timer.interval);
			timer.running = false;
		  }
		}, 1000);
	  }
	}
  
	function stopTimer(id) {
	  const timer = timers.find(t => t.id === id);
	  if (timer && timer.running) {
		clearInterval(timer.interval);
		timer.running = false;
	  }
	}
  
	function resetTimer(id) {
	  const timer = timers.find(t => t.id === id);
	  if (timer) {
		clearInterval(timer.interval);
		timer.remaining = timer.duration;
		timer.running = false;
	  }
	}
  
	function deleteTimer(id) {
	  const timer = timers.find(t => t.id === id);
	  if (timer) {
		clearInterval(timer.interval);
	  }
	  timers = timers.filter(t => t.id !== id);
	}
  
	// Stopwatch logic
	let elapsed = 0;
	let running = false;
	let interval;
  
	function start() {
	  if (!running) {
		running = true;
		interval = setInterval(() => {
		  elapsed += 1;
		}, 1000);
	  }
	}
  
	function stop() {
	  if (running) {
		clearInterval(interval);
		running = false;
	  }
	}
  
	function reset() {
	  clearInterval(interval);
	  running = false;
	  elapsed = 0;
	}
  </script>
  
  <style>
	.container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 20px;
	}
  
	.add-timer,
	.stopwatch,
	.timer {
	  margin: 20px;
	  padding: 20px;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	  background-color: #f9f9f9;
	  width: 300px;
	}
  
	.add-timer input,
	.add-timer button,
	.timer button,
	.stopwatch button {
	  margin: 5px;
	  padding: 10px;
	  border-radius: 5px;
	  border: none;
	  background-color: #e0e0e0;
	}
  
	.add-timer button:hover,
	.timer button:hover,
	.stopwatch button:hover {
	  background-color: #ccc;
	}
  
	.timer-controls {
	  display: flex;
	  justify-content: space-around;
	}
  </style>
  
  <div class="container">
	<!-- Timer Section -->
	<div class="add-timer">
	  <h2>Timers</h2>
	  <input type="text" bind:value={newTimerName} placeholder="Timer Name" />
	  <input type="number" bind:value={newTimerDuration} min="1" />
	  <button on:click={addTimer}>Add Timer</button>
	</div>
  
	{#each timers as timer (timer.id)}
	  <div class="timer">
		<h3>{timer.name}</h3>
		<h4>{Math.floor(timer.remaining / 60)}:{String(timer.remaining % 60).padStart(2, '0')}</h4>
		<div class="timer-controls">
		  <button on:click={() => startTimer(timer.id)}>Start</button>
		  <button on:click={() => stopTimer(timer.id)}>Stop</button>
		  <button on:click={() => resetTimer(timer.id)}>Reset</button>
		  <button on:click={() => deleteTimer(timer.id)}>Delete</button>
		</div>
	  </div>
	{/each}
  
	<!-- Stopwatch Section -->
	<div class="stopwatch">
	  <h2>Stopwatch</h2>
	  <h3>{Math.floor(elapsed / 3600)}:{String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}</h3>
	  <div class="timer-controls">
		<button on:click={start}>Start</button>
		<button on:click={stop}>Stop</button>
		<button on:click={reset}>Reset</button>
	  </div>
	</div>
  </div>
  