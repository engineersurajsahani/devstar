<script lang="ts">
	import {
		Bold,
		Italic,
		Heading,
		OrderedList,
		Strike,
		UnorderedList,
		Back,
		Forward,
		Folder,
		FileAdd
	} from './icons';
	import { Drawer, CloseButton } from 'flowbite-svelte';

	const tools = [
		{ icon: Bold, code: '**Strong Text**' },
		{ icon: Italic, code: '*emphasized text*' },
		{ icon: Heading, code: '## Heading' },
		{ icon: Strike, code: '~~strikethrough text~~' },
		{ icon: OrderedList, code: ' 1. List item' },
		{ icon: UnorderedList, code: ' - List item' }
	];

	const addToTextArea = function (textToAdd) {
		const textarea = document.querySelector('#myTextarea');
		let start_position = textarea.selectionStart;
		let end_position = textarea.selectionEnd;

		textarea.value = `${textarea.value.substring(
			0,
			start_position
		)} ${textToAdd} ${textarea.value.substring(end_position, textarea.value.length)}`;
	};

	export let undo;
	export let redo;

	let sidebarHidden = true;
	let transitionParams = {
		x: -320,
		duration: 200
	};
</script>

<div class="toolbar row-span-full fixed top-0 left-0 right-0 flex justify-center bg-gray-200 dark:bg-gray-900 s-Wh2ffweQoTFj z-50">
	<button on:click={() => (sidebarHidden = false)} class="dark:bg-gray-900 text-white">{@html Folder}</button>
	<button on:click={undo} class="dark:bg-gray-900 text-white">{@html Back}</button>
	<button on:click={redo} class="dark:bg-gray-900 text-white">{@html Forward}</button>
	{#each tools as tool}
		<button on:click={() => addToTextArea(tool.code)} class="dark:bg-gray-900 text-white">{@html tool.icon}</button>
	{/each}
</div>

<Drawer
	transitionType="fly"
	{transitionParams}
	bind:hidden={sidebarHidden}
	id="sidebar"
	class="dark:bg-gray-900"
>
	<div class="flex items-center bg-gray-200  p-1">
		<button class="ml-2 text-white">{@html FileAdd}</button>
		<CloseButton on:click={() => (sidebarHidden = true)} class="mt-1mb-4 dark:text-white" />
	</div>
</Drawer>

<style>
	.toolbar {
		margin: 1rem 0;
		padding: 0.1rem;
		position: sticky;
  		top: 0;
  		z-index: 10; /* Ensure it is above other elements */
	}

	.toolbar button {
		padding: 0.5rem 1rem;
		margin: 0 0.1rem;
		border-radius: 0.2rem;
	}
</style>
