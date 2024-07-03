<script lang="js">
	import Intro from './Intro.svelte';
	import Editor from './Editor.svelte';
	// import './markdown.css';

</script>


<div class="card gap-5 items-center sm:grid-row-3 mx-auto max-w-screen-xl lg:grid lg:grid-rows-2 overflow-hidden rounded-lg">
	<Editor />
</div>

<style>
	:is(.dark .card) {
		box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 2px;
	}
</style>