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
</script>

<Toolbar {undo} {redo} />
<div class="card gap-4 lg:grid lg:grid-cols-2 overflow-hidden rounded-lg editor-wrapper">
	<div class="p-2 bg-white">
		<textarea
			name="markdown"
			bind:value={markdownCode}
			on:input={(e) => (preview = marked(e.target.value))}
			on:scroll={syncScroll}
			on:keydown={saveMarkdown}
			bind:this={markdownTop}
			class="rounded-lg w-full h-full resize-none border-none p-1"
			id="myTextarea"
		/>
	</div>
	<div
		class="pl-4 p-2 pb-4 h-full marked-preview bg-white overflow-scroll"
		bind:this={previewTop}
		on:scroll={syncScroll}
	>
		{@html preview}
	</div>
</div>

<style>
	.marked-preview {
		border-left: 2px solid black;
		padding-left: 1rem; /* Added padding for better readability */
	}

	.editor-wrapper {
		height: 66vh;
	}

	.card {
		box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 2px;
		padding: 1rem; /* Added padding for better aesthetics */
		border-radius: 0.5rem; /* Added rounded corners */
	}

	#myTextarea {
		width: 100%;
		height: 65vh;
		margin-bottom: 1rem;
		padding: 0.5rem; /* Added padding for better usability */
		border: 1px solid #ccc; /* Added border for better visibility */
		border-radius: 0.25rem; /* Added rounded corners */
	}

	.toolbar {
		margin: 1rem 0;
		padding: 0.5rem; /* Increased padding for better usability */
		background-color: #f8f9fa; /* Light background for better contrast */
		border-radius: 0.25rem; /* Added rounded corners */
		box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px; /* Added shadow for depth */
		display: flex;
		justify-content: space-around; /* Spacing between buttons */
	}

	.toolbar button {
		padding: 0.5rem 1rem;
		margin: 0 0.2rem;
		border-radius: 0.2rem;
		background-color: #007bff; /* Bootstrap primary color */
		color: white;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.toolbar button:hover {
		background-color: #0056b3; /* Darker blue on hover */
	}

	/* Additional styles for markdown content */
	.editor h1,
	.editor h2,
	.editor h3,
	.editor h4,
	.editor h5,
	.editor h6 {
		margin-left: 0;
		margin-right: 0;
		font-weight: bold;
	}

	.editor p {
		margin-left: 0;
		margin-right: 0;
	}

	.editor code {
		background: rgba(0, 0, 0, 0.1);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
	}

	.editor ul {
		margin-left: 2rem;
		list-style: disc;
	}

	.editor #myTextarea:focus {
		outline: none;
	}
</style>
