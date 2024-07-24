<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  // Stopwatch Logic
  let stopwatchElapsed = 0;
  let stopwatchRunning = false;
  let stopwatchInterval;
  let laps = [];

  function startStopwatch() {
    if (!stopwatchRunning) {
      stopwatchRunning = true;
      stopwatchInterval = setInterval(() => {
        stopwatchElapsed += 1;
      }, 1000);
    }
  }

  function stopStopwatch() {
    if (stopwatchRunning) {
      clearInterval(stopwatchInterval);
      stopwatchRunning = false;
    }
  }

  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchElapsed = 0;
    laps = [];
  }

  function lapStopwatch() {
    if (stopwatchRunning) {
      laps = [...laps, stopwatchElapsed];
    }
  }

  // Timer Logic
  let timers = [];
  let nextId = 1;

  function addTimer() {
    timers = [...timers, { id: nextId++, name: '', seconds: 0, interval: null, running: false }];
  }

  function setTimer(id, seconds) {
    timers = timers.map(timer =>
      timer.id === id ? { ...timer, seconds: seconds } : timer
    );
  }

  function startTimer(id) {
    timers = timers.map(timer => {
      if (timer.id === id && !timer.running) {
        const interval = setInterval(() => {
          timers = timers.map(t => {
            if (t.id === id) {
              if (t.seconds > 0) {
                return { ...t, seconds: t.seconds - 1 };
              } else {
                clearInterval(t.interval);
                return { ...t, running: false, interval: null };
              }
            }
            return t;
          });
        }, 1000);
        return { ...timer, running: true, interval };
      }
      return timer;
    });
  }

  function stopTimer(id) {
    timers = timers.map(timer => {
      if (timer.id === id && timer.running) {
        clearInterval(timer.interval);
        return { ...timer, running: false, interval: null };
      }
      return timer;
    });
  }

  function resetTimer(id) {
    timers = timers.map(timer => {
      if (timer.id === id) {
        clearInterval(timer.interval);
        return { ...timer, seconds: 0, running: false, interval: null };
      }
      return timer;
    });
  }

  function deleteTimer(id) {
    timers = timers.filter(t => t.id !== id);
  }

  onDestroy(() => {
    timers.forEach(timer => {
      if (timer.interval) {
        clearInterval(timer.interval);
      }
    });
  });

  // Alarm Clock Logic
  let alarms = [];
  let alarmTime = '';
  let alarmId = 0;
  let alarmAudio;

  onMount(() => {
    alarmAudio = new Audio('src\routes\(tools)\multi-timer-with-alarm\sounds\Clock-chimes-sounds.mp3'); 
  });

  function addAlarm() {
    if (alarmTime) {
      alarms = [...alarms, { id: alarmId++, time: alarmTime }];
      alarmTime = '';
    }
  }

  function deleteAlarm(id) {
    alarms = alarms.filter(a => a.id !== id);
  }

  function checkAlarms() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    alarms.forEach(alarm => {
      if (alarm.time === currentTime) {
        alarmAudio.play();
      }
    });
  }

  setInterval(checkAlarms, 1000);

  // World and Local Clock Logic
  let localTime = new Date();
  let worldTimes = {
    'New York': new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
    'London': new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
    'Tokyo': new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  };

  function updateClocks() {
    localTime = new Date();
    worldTimes = {
      'New York': new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      'London': new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
      'Tokyo': new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    };
  }

  setInterval(updateClocks, 1000);

  // Calendar and Notes Logic
  let currentDate = new Date();
  let notes = writable({});
  let selectedDate = new Date().toISOString().substring(0, 10);
  let newNote = '';

  function addNote() {
    if (newNote.trim()) {
      notes.update(n => {
        if (!n[selectedDate]) {
          n[selectedDate] = [];
        }
        n[selectedDate].push(newNote);
        return n;
      });
      newNote = '';
    }
  }

  onMount(() => {
    updateClocks();
  });

  let activeTab = 0;

  function setActiveTab(index) {
    activeTab = index;
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .section {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 600px;
  }

  .section h2 {
    color: #333;
  }

  input,
  button,
  .tab button {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #e0e0e0;
  }

  button:hover,
  .tab button:hover {
    background-color: #ccc;
  }

  .tab {
    display: flex;
    justify-content: space-around;
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
  }

  .timer-container {
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .timer {
    font-size: 1.5em;
    margin-bottom: 1em;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
  }

  .controls button {
    padding: 0.5em 1em;
    font-size: 1em;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    transition: background-color 0.3s, transform 0.2s;
  }

  .controls .start {
    background-color: #ff6f61;
  }

  .controls .stop {
    background-color: #6b5b95;
  }

  .controls .reset {
    background-color: #feb236;
  }

  .controls .delete {
    background-color: #d9d9d9;
    color: #333;
  }

  .controls button:hover {
    transform: scale(1.05);
  }

  .add-timer {
    margin-bottom: 1em;
    padding: 0.5em 1em;
    font-size: 1em;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #17a2b8;
    transition: background-color 0.3s, transform 0.2s;
  }

  .add-timer:hover {
    background-color: #138496;
    transform: scale(1.05);
  }
</style>

<div class="container">
  <!-- Tab Navigation -->
  <div class="tab">
    <button on:click={() => setActiveTab(0)}>Stopwatch</button>
    <button on:click={() => setActiveTab(1)}>Timers</button>
    <button on:click={() => setActiveTab(2)}>Alarm Clock</button>
    <button on:click={() => setActiveTab(3)}>Clocks</button>
    <button on:click={() => setActiveTab(4)}>Calendar</button>
  </div>

  <!-- Stopwatch Section -->
  <div class="section tab-content {activeTab === 0 ? 'active' : ''}">
    <h2>Stopwatch</h2>
    <h3>{Math.floor(stopwatchElapsed / 3600)}:{String(Math.floor((stopwatchElapsed % 3600) / 60)).padStart(2, '0')}:{String(stopwatchElapsed % 60).padStart(2, '0')}</h3>
    <div class="controls">
      <button class="start" on:click={startStopwatch}>Start</button>
      <button class="stop" on:click={stopStopwatch}>Stop</button>
      <button class="reset" on:click={resetStopwatch}>Reset</button>
    </div>
    <div class="laps">
      {#each laps as lap}
        <div>Lap: {Math.floor(lap / 3600)}:{String(Math.floor((lap % 3600) / 60)).padStart(2, '0')}:{String(lap % 60).padStart(2, '0')}</div>
      {/each}
    </div>
    <button on:click={lapStopwatch}>Lap</button>
  </div>

  <!-- Timer Section -->
  <div class="section tab-content {activeTab === 1 ? 'active' : ''}">
    <h2>Timers</h2>
    {#each timers as timer}
      <div class="timer-container">
        <h3>{timer.name || `Timer ${timer.id}`}</h3>
        <div class="timer">{String(Math.floor(timer.seconds / 3600)).padStart(2, '0')}:{String(Math.floor((timer.seconds % 3600) / 60)).padStart(2, '0')}:{String(timer.seconds % 60).padStart(2, '0')}</div>
        <div class="controls">
          <button class="start" on:click={() => startTimer(timer.id)}>Start</button>
          <button class="stop" on:click={() => stopTimer(timer.id)}>Stop</button>
          <button class="reset" on:click={() => resetTimer(timer.id)}>Reset</button>
          <button class="delete" on:click={() => deleteTimer(timer.id)}>Delete</button>
        </div>
        <input type="number" min="0" on:input={e => setTimer(timer.id, +e.target.value)} placeholder="Set seconds" />
      </div>
    {/each}
    <button class="add-timer" on:click={addTimer}>Add Timer</button>
  </div>

  <!-- Alarm Clock Section -->
  <div class="section tab-content {activeTab === 2 ? 'active' : ''}">
    <h2>Alarm Clock</h2>
    <input type="time" bind:value={alarmTime} />
    <button on:click={addAlarm}>Add Alarm</button>
    {#each alarms as alarm}
      <div>
        <span>{alarm.time}</span>
        <button on:click={() => deleteAlarm(alarm.id)}>Delete</button>
      </div>
    {/each}
  </div>

  <!-- Clocks Section -->
  <div class="section tab-content {activeTab === 3 ? 'active' : ''}">
    <h2>Clocks</h2>
    <div>
      <h3>Local Time: {localTime.toLocaleTimeString()}</h3>
    </div>
    {#each Object.entries(worldTimes) as [city, time]}
      <div>
        <h3>{city}: {time}</h3>
      </div>
    {/each}
  </div>

  <!-- Calendar Section -->
  <div class="section tab-content {activeTab === 4 ? 'active' : ''}">
    <h2>Calendar and Notes</h2>
    <div>
      <input type="date" bind:value={selectedDate} />
      <textarea bind:value={newNote} placeholder="Add a new note"></textarea>
      <button on:click={addNote}>Add Note</button>
      <div>
        {#if $notes[selectedDate]}
          {#each $notes[selectedDate] as note}
            <div>{note}</div>
          {/each}
        {:else}
          <div>No notes for this date.</div>
        {/if}
      </div>
    </div>
  </div>
</div>
