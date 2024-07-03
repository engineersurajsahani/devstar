<script lang="ts">
	import { marked } from 'marked';
	import Toolbar from './Toolbar.svelte';

	let markdownCode = `# Welcome to Markdown Editor Tool!

Hi! I'm your first Markdown code in **</Dev>star**. If you want to learn about Markdown Editor, you can read me. If you want to play with Markdown, you can edit me.

# Files

This editor stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Some text stylings

**strong text**
_emphasized text_
~~strikethrough text~~

# What is Lorem Ipsum?

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Why do we use it?

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

### Where does it come from?

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`;

	let preview = marked(markdownCode);
	export let markedCode;
	// Synchronous scroll functionality
	let markdownTop;
	let previewTop;
	const syncScroll = (e) => {
		markdownTop.scrollTop = e.target.scrollTop;
		previewTop.scrollTop = markdownTop.scrollTop;
	};

	// Undo Redo Functionality
	let histIndex = -1;
	let history = [];

	function saveMarkdown(e) {
		console.log(e);
		if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 190 || e.keyCode === 188) {
			let code = e.target.value;
			if (history[histIndex] !== code) {
				history.splice(histIndex + 1);
				history.push(code);
				histIndex = history.length - 1;
			}
		}
	}

	function undo() {
		if (histIndex > 0) {
			histIndex--;
			markdownCode = history[histIndex];
		}
	}

	function redo() {
		if (histIndex < history.length - 1) {
			histIndex++;
			markdownCode = history[histIndex];
		}
	}

	// Save As Functionality
	export const saveAs = async () => {
		const options = {
			suggestedName: 'markdown-file.md',
			types: [
				{
					description: 'Markdown Files',
					accept: { 'text/markdown': ['.md'] },
				},
			],
		};
		const handle = await window.showSaveFilePicker(options);
		const writable = await handle.createWritable();
		await writable.write(markdownCode);
		await writable.close();
		const file = await handle.getFile();
		const fileHandle = handle;
	};
</script>

<Toolbar {undo} {redo} saveAs={saveAs}/>
<div class="card gap-1 pd-1 lg:grid lg:grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-lg editor-wrapper">
	<div >
		<textarea
			name="markdown"
			bind:value={markdownCode}
			on:input={(e) => (preview = marked(e.target.value))}
			on:scroll={syncScroll}
			on:keydown={saveMarkdown}
			bind:this={ markdownTop}
			class="rounded-lg w-full h-full pd-1 ml-1 border-none p-1 dark:bg-gray-800 dark:text-white"
			id="myTextarea"
		/>
	</div>
	<div
		class="pl-4 pd-1 mr-1 pb-4 h-full marked-preview overflow-scroll dark:bg-gray-800 dark:text-white"
		bind:this={ previewTop}
		on:scroll={syncScroll}
	>
		{@html preview}
	</div>
</div>

<style>
	.marked-preview {
		border-left: 2px solid black;
		position: relative;
  		overflow-y: auto;
		overflow-x: auto; 
	}

	.editor-wrapper {
		height: 66vh;
	}

	.card {
		box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 2px;
	}

	#myTextarea {
		width: 100%;
		margin-bottom: 1rem;
		height: 100%;;
	}
</style>
