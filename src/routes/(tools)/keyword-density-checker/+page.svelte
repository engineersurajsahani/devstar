<script>
	let url = '';
	let inputType = 'url';
  
	function setInputType(type) {
	  inputType = type;
	}
  
	function checkKeywordDensity() {
	  // Implement your keyword density checking logic here
	  console.log('Checking keyword density for:', url);
	}
  </script>
  
  <div class="card mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 gap-16 overflow-hidden rounded-lg">
	<!-- Add tool here -->
	<div class="content text-center mx-auto flex flex-col justify-center items-center">
	  <p class="mt-4 text-lg">Keyword density tool, check by URL or text. Get density for one, two and three words, etc.</p>
	  <div class="input-type mt-4 flex justify-center">
		<button 
		  on:click={() => setInputType('url')} 
		  class={`px-4 py-2 rounded-l focus:outline-none ${inputType === 'url' ? 'bg-gray-300' : 'bg-gray-200'}`}
		>
		  URL Input
		</button>
		<button 
		  on:click={() => setInputType('text')} 
		  class={`px-4 py-2 rounded-r focus:outline-none ${inputType === 'text' ? 'bg-gray-300' : 'bg-gray-200'}`}
		>
		  Text Input
		</button>
	  </div>
	  {#if inputType === 'url'}
		<input 
		  type="url" 
		  bind:value={url} 
		  placeholder="http://"
		  class="mt-4 p-2 border border-gray-300 rounded w-full"
		/>
	  {:else}
		<textarea 
		  bind:value={url} 
		  placeholder="Enter text here..." 
		  class="mt-4 p-2 border border-gray-300 rounded w-full h-24"
		></textarea>
	  {/if}
	  <button
		on:click={checkKeywordDensity}
		class="bg-blue-500 text-white px-4 py-2 rounded mt-4 focus:outline-none focus:bg-blue-700"
	  >
		Check Keyword Density
	  </button>
	</div>
  </div>
  
  <style>
	.card {
	  padding: 2rem;
	  background-color: white;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
  
	.content {
	  text-align: center;
	  width: 100%;
	  max-width: 600px; /* Set a max width for the content */
	  margin: auto; /* Center horizontally */
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	}
  
	.input-type button {
	  min-width: 100px; /* Ensure buttons have a minimum width */
	}
  </style>
  