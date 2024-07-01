<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	
	let title = '';
	let description = '';
	let file = null;
	let metaTags = '';
	
	let containerStyle = '';
	let dragDropBoxStyle = '';
	let buttonStyle = '';
	
	function handleFileDrop(event) {
	  event.preventDefault();
	  const droppedFiles = event.dataTransfer.files;
	  if (droppedFiles.length > 0) {
		file = droppedFiles[0];
	  }
	  updateStyles();
	}
  
	function handleFileClick(event) {
	  const input = event.target;
	  input.addEventListener('change', () => {
		if (input.files.length > 0) {
		  file = input.files[0];
		}
		updateStyles();
	  });
	}
  
	function handleDragOver(event) {
	  event.preventDefault();
	}
  
	function handleKeyDown(event) {
	  if (event.key === 'Enter' || event.key === ' ') {
		document.getElementById('fileInput').click();
	  }
	}
  
	async function getCode() {
	  if (!file) {
		alert('Please upload a file');
		return;
	  }
  
	  const path = URL.createObjectURL(file);
	  try {
		const response = await axios.post('http://localhost:5000/api/upload', {
		  title,
		  description,
		  path
		});
  
		metaTags = response.data.metaTags;
	  } catch (error) {
		console.error('Error uploading file', error);
	  }
	}
  
	function updateStyles() {
	  containerStyle = file ? 'background-color: #e0ffe0;' : 'background-color: #ffffff;';
	  dragDropBoxStyle = file ? 'border: 2px solid #00ff00;' : 'border: 2px dashed #ccc;';
	  buttonStyle = file ? 'background-color: #28a745;' : 'background-color: #007bff;';
	}
  
	onMount(() => {
	  updateStyles();
	});
  </script>
  
  <div class="container" style={containerStyle}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
	  class="drag-drop-box"
	  tabindex="0"
	  on:drop={handleFileDrop}
	  on:dragover={handleDragOver}
	  on:click={() => document.getElementById('fileInput').click()}
	  on:keydown={handleKeyDown}
	  style={dragDropBoxStyle}
	>
	  <input type="file" id="fileInput" on:click={handleFileClick} />
	  {#if file}
		<p>{file.name}</p>
	  {:else}
		<p>Drag and drop a file or click to select one</p>
	  {/if}
	</div>
	
	<input
	  type="text"
	  class="title-box"
	  placeholder="Title"
	  bind:value={title}
	/>
	
	<textarea
	  class="description-box"
	  placeholder="Description"
	  bind:value={description}
	></textarea>
	
	<button on:click={getCode} style={buttonStyle}>Get Code</button>
  
	{#if metaTags}
	  <div class="meta-tags">
		<pre>{metaTags}</pre>
	  </div>
	{/if}
  </div>
  <style>
	.container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  gap: 1rem;
	  padding: 2rem;
	  border: 1px solid #ccc;
	  border-radius: 8px;
	  max-width: 400px;
	  margin: auto;
	  transition: background-color 0.3s ease;
	}
  
	.drag-drop-box {
	  width: 100%;
	  height: 100px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  cursor: pointer;
	  transition: border 0.3s ease;
	}
  
	input[type="file"] {
	  display: none;
	}
  
	.title-box,
	.description-box {
	  width: 100%;
	}
  
	button {
	  padding: 0.5rem 1rem;
	  color: white;
	  border: none;
	  border-radius: 4px;
	  cursor: pointer;
	  transition: background-color 0.3s ease;
	}
  
	.meta-tags {
	  margin-top: 1rem;
	  padding: 1rem;
	  background-color: #f0f0f0;
	  border: 1px solid #ccc;
	  border-radius: 8px;
	  width: 100%;
	}
  
	pre {
	  white-space: pre-wrap;
	  word-wrap: break-word;
	}
  </style>
  