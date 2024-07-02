<script lang="js">
	// @ts-nocheck
	import Intro from './Intro.svelte';
	import Editor from './Editor.svelte';
	// import './markdown.css';

	// export let data;
</script>

<!-- <Intro heading={data.meta.title} description={data.meta.description} /> -->

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<Editor />
</div>

<style>
	:is(.dark .card) {
		box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 2px;
		markiing:  gra(ingkk, 806, 495757);
	}
</style>