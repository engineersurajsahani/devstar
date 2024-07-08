<script>
import { onMount } from 'svelte';
  
	let url = '';
	let inputType = 'url';
	let textInput = '';
	let includeMeta = false;
	let includeTitle = false;
	let includeAlt = false;
	let results = [];
	const stopWords = new Set(['i', 'before' ,'after','during','we','he','she','it','an', 'will', 'can', 'and', 'the', 'is', 'in', 'at', 'of', 'a', 'to', 'with']);
  
	function setInputType(type) {
	  inputType = type;
	}
  
	async function extractWords() {
	  let text = '';
  
	  try {
		if (inputType === 'url') {
		  const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
		  if (!response.ok) {
			throw new Error('Failed to fetch the URL');
		  }
  
		  const data = await response.json();
		  const html = data.contents;
		  const parser = new DOMParser();
		  const doc = parser.parseFromString(html, 'text/html');
		  text = doc.body.textContent || '';
  
		  if (includeMeta) {
			const metaTags = Array.from(doc.getElementsByTagName('meta'))
			  .map(tag => tag.getAttribute('content') || '')
			  .join(' ');
			text += ' ' + metaTags;
		  }
  
		  if (includeTitle) {
			const titleTag = doc.title || '';
			text += ' ' + titleTag;
		  }
  
		  if (includeAlt) {
			const altTags = Array.from(doc.getElementsByTagName('img'))
			  .map(img => img.getAttribute('alt') || '')
			  .join(' ');
			text += ' ' + altTags;
		  }
		} else {
		  text = url;
		}
  
		calculateDensities(text);
	  } catch (err) {
		console.error(err.message);
	  }
	}
  
	function calculateDensities(text) {
	  if (text) {
		const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
		const filteredWords = words.filter(word => !stopWords.has(word));
  
		const wordCounts = filteredWords.reduce((counts, word) => {
		  counts[word] = (counts[word] || 0) + 1;
		  return counts;
		}, {});
  
		const totalWords = filteredWords.length;
  
		results = Object.entries(wordCounts).map(([word, count]) => ({
		  keyword: word,
		  count: count,
		  density: ((count / totalWords) * 100).toFixed(2)
		}));
  
		results.sort((a, b) => b.density - a.density);
	  } else {
		results = [];
	  }
	}
  </script>
  
  <div class="card mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 gap-16 overflow-hidden rounded-lg">
	<!-- Add tool here -->	<div class="content text-center mx-auto flex flex-col justify-center items-center">
	  <p class="mt-4 text-lg">Keyword density tool: check by URL or text. Get density for one, two, and three words, etc.</p>
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
		<div class="mt-4 flex flex-row items-center justify-between w-full">
		  <label class="flex items-center">
			<input type="checkbox" bind:checked={includeMeta} />
			<span class="ml-2">Include Meta Tags</span>
		  </label>
		  <label class="flex items-center">
			<input type="checkbox" bind:checked={includeTitle} />
			<span class="ml-2">Include Titles</span>
		  </label>
		  <label class="flex items-center">
			<input type="checkbox" bind:checked={includeAlt} />
			<span class="ml-2">Include Alt Titles</span>
		  </label>
		</div>
	  {:else}
		<textarea 
		  bind:value={url} 
		  placeholder="Enter text here..." 
		  class="mt-4 p-2 border border-gray-300 rounded w-full h-24"
		></textarea>
	  {/if}
	  <button
		on:click={extractWords}
		class="bg-blue-500 text-white px-4 py-2 rounded mt-4 focus:outline-none focus:bg-blue-700"
	  >
		Check Keyword Density
	  </button>
	</div>
  </div>
  
  <div class="results-container">
	{#if results.length > 0}
	  <h3>Keyword Density Table:</h3>
	  <table>
		<thead>
		  <tr>
			<th>Keyword</th>
			<th>Count</th>
			<th>Density (%)</th>
		  </tr>
		</thead>
		<tbody>
		  {#each results as result}
			<tr>
			  <td>{result.keyword}</td>
			  <td>{result.count}</td>
			  <td>{result.density}%</td>
			</tr>
		  {/each}
		</tbody>
	  </table>
	{:else}
	  <p>No valid words to display. Please enter some text.</p>
	{/if}
  </div>
  
  <style>
  .form-container {
    margin: 20px;
  }
  .results-container {
    margin: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  
