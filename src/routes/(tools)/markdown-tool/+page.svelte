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

			