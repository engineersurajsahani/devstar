<script lang="ts">
	import { Button, Label, Textarea } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import { faBold, faItalic, faUndo, faRedo, faSave, faFolderOpen, faListOl, faListUl, faCopy, faFileDownload } from '@fortawesome/free-solid-svg-icons';
	import { library } from '@fortawesome/fontawesome-svg-core';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	library.add(faBold, faItalic, faUndo, faRedo, faSave, faFolderOpen, faListOl, faListUl, faCopy, faFileDownload);

	let markdownText = '';
	let htmlCode = '';
	let htmlElement: HTMLElement;
	let history = [];
	let historyIndex = -1;

	function updateHtml() {
		htmlCode = marked(markdownText, { breaks: true });
		if (htmlElement) {
			htmlElement.innerHTML = htmlCode;
		}
		addToHistory(markdownText);
	}

	const copyCode = async (code) => {
		try {
			await navigator.clipboard.writeText(code);
			console.log("Copied to clipboard");
		} catch (error) {
			console.error("Error copying text to clipboard:", error);
		}
	};

	function downloadAsText() {
		const blob = new Blob([htmlCode], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'markdown.html';
		document.body.appendChild(link); // Required for Firefox
		link.click();
		document.body.removeChild(link); // Cleanup
		URL.revokeObjectURL(url); // Clean up the URL object
	}

	function saveMarkdown() {
		const blob = new Blob([markdownText], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'markdown.md';
		document.body.appendChild(link); // Required for Firefox
		link.click();
		document.body.removeChild(link); // Cleanup
		URL.revokeObjectURL(url); // Clean up the URL object
	}

	function openMarkdown(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			markdownText = e.target.result as string;
			updateHtml();
		};
		reader.readAsText(file);
	}

	function applyStyle(style) {
		const textarea = document.querySelector('textarea');
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = markdownText.substring(start, end);

		let newText = '';
		if (style === 'bold') {
			newText = `**${selectedText}**`;
		} else if (style === 'italic') {
			newText = `*${selectedText}*`;
		} else if (style === 'orderedList') {
			const lines = selectedText.split('\n');
			newText = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
		} else if (style === 'unorderedList') {
			newText = selectedText.replace(/^/gm, '- ');
		}

		markdownText = markdownText.substring(0, start) + newText + markdownText.substring(end);
		updateHtml();
		textarea.focus();
		textarea.selectionStart = start;
		textarea.selectionEnd = start + newText.length;
	}

	function addToHistory(text) {
		if (historyIndex === -1 || text !== history[historyIndex]) {
			history.splice(historyIndex + 1);
			history.push(text);
			historyIndex++;
		}
	}

	function undo() {
		if (historyIndex > 0) {
			historyIndex--;
			markdownText = history[historyIndex];
			updateHtml();
		}
	}

	function redo() {
		if (historyIndex < history.length - 1) {
			historyIndex++;
			markdownText = history[historyIndex];
			updateHtml();
		}
	}

	onMount(updateHtml);
</script>

<div class="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
	<main class="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
		<!-- Settings (Left Half) -->
		<div class="w-full md:w-1/2 flex flex-col p-4">
			<!-- Toolbar -->
			<div class="flex flex-wrap gap-2 mb-4">
				<Button on:click={() => applyStyle('bold')} title="Bold">
					<FontAwesomeIcon icon={faBold} />
				</Button>
				<Button on:click={() => applyStyle('italic')} title="Italic">
					<FontAwesomeIcon icon={faItalic} />
				</Button>
				<Button on:click={() => applyStyle('orderedList')} title="Ordered List">
					<FontAwesomeIcon icon={faListOl} />
				</Button>
				<Button on:click={() => applyStyle('unorderedList')} title="Unordered List">
					<FontAwesomeIcon icon={faListUl} />
				</Button>
				<Button on:click={undo} title="Undo">
					<FontAwesomeIcon icon={faUndo} />
				</Button>
				<Button on:click={redo} title="Redo">
					<FontAwesomeIcon icon={faRedo} />
				</Button>
				<Button on:click={() => document.querySelector('input[type=file]').click()} title="Open">
					<FontAwesomeIcon icon={faFolderOpen} />
				</Button>
				<Button on:click={saveMarkdown} title="Save">
					<FontAwesomeIcon icon={faSave} />
				</Button>
				<Button on:click={() => copyCode(htmlCode)} title="Copy HTML">
					<FontAwesomeIcon icon={faCopy} />
				</Button>
				<Button on:click={downloadAsText} title="Download HTML">
					<FontAwesomeIcon icon={faFileDownload} />
				</Button>
				<input type="file" class="hidden" on:change={openMarkdown} />
			</div>

			<!-- Markdown Input -->
			<div class="relative mb-8 flex-1">
				<Label for="markdownText" class="text-gray-700 dark:text-gray-400 font-semibold">Markdown Input:</Label>
				<Textarea 
					bind:value={markdownText} 
					on:input={updateHtml}
					rows="20"
					class="w-full mt-2 p-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
				></Textarea>
			</div>
		</div>

		<!-- HTML Preview (Right Half) -->
		<div class="w-full md:w-1/2 flex flex-col p-4">
			<Label class="text-gray-700 dark:text-gray-400 font-semibold mb-2">HTML Preview:</Label>
			<div 
				class="w-full h-full rounded-lg border border-gray-300 p-6 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 overflow-auto shadow-inner flex-1"
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
