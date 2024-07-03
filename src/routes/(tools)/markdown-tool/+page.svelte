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
