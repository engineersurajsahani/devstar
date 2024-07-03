
function applyStyle(style) {
	const textarea = document.querySelector('textarea');
	const start = textarea.selectionStart;
	const end = textarea.selectionEnd;
	const selectedText = markdownText.substring(start, end);

	let newText = '';
	if (style === 'bold') {
		newText = **${selectedText}**;
	} else if (style === 'italic') {
		newText = *${selectedText}*;
	} else if (style === 'orderedList') {
		const lines = selectedText.split('\n');
		newText = lines.map((line, index) => ${index + 1}. ${line}).join('\n');
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

