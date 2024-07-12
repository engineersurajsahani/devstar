<!-- <script>

</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	
	
</div>

<style>

</style> -->
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
	  { name: 'CSS Glassmorphism Generator', component: Glassmorphism }
	];

	function selectTab(tabName) {
	  currentTab = tabName;
	}
</script>

<div>
	<!-- Tab Navigation -->
	<div class="tab-nav">
	  {#each tabs as tab}
		<button
		  class:active={currentTab === tab.name}
		  on:click={() => selectTab(tab.name)}
		>
		  {tab.name}
		</button>
	  {/each}
	</div>

	<!-- Tab Content -->
	<div class="tab-content">
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
	.tab-nav {
	  display: flex;
	  background-color: #f0f0f0;
	  padding: 0.5rem;
	  border-bottom: 1px solid #ccc;
	}

	.tab-nav button {
	  flex: 1;
	  padding: 1rem;
	  background: none;
	  border: none;
	  cursor: pointer;
	  text-align: center;
	  border-radius: 0.25rem 0.25rem 0 0;
	  margin-right: 0.5rem;
	  font-weight: bold;
	}

	.tab-nav button.active {
	  background-color: white;
	  border-bottom: 2px solid white;
	}

	.tab-content {
	  padding: 1rem;
	  background-color: #ffffff;
	  border: 1px solid #ccc;
	  border-top: none;
	  border-radius: 0 0 0.25rem 0.25rem;
	}
</style>
