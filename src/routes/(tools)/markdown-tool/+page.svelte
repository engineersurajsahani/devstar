<script lang="ts">
	import { Button, Popover, Label, Textarea } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
  
	let markdownText = '';
	let htmlCode = '';
	let htmlElement: HTMLElement;
  
	function updateHtml() {
	  htmlCode = marked(markdownText);
	  if (htmlElement) {
		htmlElement.innerHTML = htmlCode;
	  }
	}
  
	const copyCode = async () => {
	  try {
		await navigator.clipboard.writeText(htmlCode);
		console.log("HTML Copied");
	  } catch (error) {
		console.error("Error copying text to clipboard:", error);
	  }
	};
  
	function downloadAsText() {
	  const blob = new Blob([htmlCode], { type: 'text/plain' });
	  const url = URL.createObjectURL(blob);
	  const link = document.createElement('a');
	  link.href = url;
	  link.download = 'markdown.html';
	  link.click();
	}
  
	onMount(updateHtml);
</script>
  
<div class="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
	<main class="w-full max-w-6xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
		<!-- Settings (Left Half) -->
		<div class="w-full md:w-1/2 p-4">
		  <!-- Markdown Input -->
		  <div class="mt-4">
			<Label for="markdownText" class="text-gray-700 dark:text-gray-400 font-semibold">Markdown Input:</Label>
			<Textarea 
			  bind:value={markdownText} 
			  on:input={updateHtml}
			  rows="20"
			  class="w-full mt-2 p-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			></Textarea>
		  </div>
  
		  <!-- Button Container -->
		  <div class="grid grid-cols-2 gap-4 mt-4">
			<!-- Copy HTML Button -->
			<Button
			  id="b1"
			  type="button"
			  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 transition ease-in-out duration-200"
			  on:click={copyCode}
			>
			  Copy HTML
			</Button>
  
			<Popover class="w-64 text-sm font-light" title="HTML Output" triggeredBy="#b1">
			  {htmlCode}
			</Popover>
  
			<!-- Download HTML Button -->
			<Button
			  type="button"
			  class="flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700 transition ease-in-out duration-200"
			  on:click={downloadAsText}
			>
			  Download HTML
			</Button>
		  </div>
		</div>
  
		<!-- HTML Preview (Right Half) -->
		<div class="w-full md:w-1/2 p-4">
		  <div 
			class="w-full h-full rounded-lg border border-gray-300 p-6 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 overflow-auto shadow-inner"
			bind:this={htmlElement}
		  ></div>
		</div>
	</main>
</div>
  
<style>
	div[bind\:this="htmlElement"] {
	  white-space: pre-wrap;
	}

	@media (max-width: 768px) {
		main {
			flex-direction: column;
		}
	}
</style>
