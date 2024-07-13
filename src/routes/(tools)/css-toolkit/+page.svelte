<!-- <script>
	import TextGradient from './TextGradient.svelte';
	import BoxShadow from './BoxShadow.svelte';
	import HoverEffect from './HoverEffect.svelte';
	import Glassmorphism from './Glassmorphism.svelte';

	let currentTab = 'CSS Text Gradient Generator';

	const tabs = [
		{ name: 'CSS Text Gradient Generator', component: TextGradient },
		{ name: 'CSS Box Shadow Generator', component: BoxShadow },
		{ name: 'CSS Hover Effect Generator', component: HoverEffect },
		{ name: 'CSS Glassmorphism Generator', component: Glassmorphism }
	];

	function selectTab(tabName) {
		currentTab = tabName;
	}
</script>

<div class="flowbite"> -->
	<!-- Tab Navigation -->
	<!-- <div class="flex border-b border-gray-200 dark:border-gray-700 justify-center space-x-4">
		{#each tabs as tab}
			<button
				class="tab-button inline-block py-4 px-6 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
				class:active-tab={currentTab === tab.name}
				on:click={() => selectTab(tab.name)}
			>
				{tab.name}
			</button>
		{/each}
	</div> -->

	<!-- Tab Content -->
	<!-- <div class="p-4 bg-white rounded-lg dark:bg-gray-800 mt-4">
		{#if currentTab === 'CSS Text Gradient Generator'}
			<TextGradient />
		{:else if currentTab === 'CSS Box Shadow Generator'}
			<BoxShadow />
		{:else if currentTab === 'CSS Hover Effect Generator'}
			<HoverEffect />
		{:else if currentTab === 'CSS Glassmorphism Generator'}
			<Glassmorphism />
		{/if}
	</div>
</div> 

<style>
	.flowbite {
		max-width: 800px;
		margin: 0 auto;
	}
	
	.flex {
		display: flex;
	}
	.space-x-4 > * + * {
		margin-left: 1rem;
	}
	.tab-button.active-tab {
		border-bottom-color: #000; 
		color: #000; 
	}
</style>
 -->


 <script>
	import TextGradient from './TextGradient.svelte';
	import BoxShadow from './BoxShadow.svelte';
	import HoverEffect from './HoverEffect.svelte';
	import Glassmorphism from './Glassmorphism.svelte';
  
	let currentTab = 'CSS Text Gradient Generator';
  
	const tabs = [
	  { name: 'CSS Text Gradient Generator', component: TextGradient },
	  { name: 'CSS Box Shadow Generator', component: BoxShadow },
	  { name: 'CSS Hover Effect Generator', component: HoverEffect },
	  { name: 'CSS Glassmorphism Generator', component: Glassmorphism },
	];
  
	function selectTab(tabName) {
	  currentTab = tabName;
	}
  </script>
  
  <div class="flowbite">
	<div class="flex border-b border-gray-200 dark:border-gray-700 justify-center space-x-4">
	  {#each tabs as tab}
		<button
		  class="tab-button inline-block py-4 px-6 rounded-t-lg text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
		  class:active-tab={currentTab === tab.name}
		  on:click={() => selectTab(tab.name)}
		>
		  {tab.name}
		</button>
	  {/each}
	</div>
  
	<div class="p-4 bg-white rounded-lg dark:bg-gray-800 mt-4">
	  {#if currentTab === 'CSS Text Gradient Generator'}
		<TextGradient />
	  {:else if currentTab === 'CSS Box Shadow Generator'}
		<BoxShadow />
	  {:else if currentTab === 'CSS Hover Effect Generator'}
		<HoverEffect />
	  {:else if currentTab === 'CSS Glassmorphism Generator'}
		<Glassmorphism />
	  {/if}
	</div>
  </div>
  