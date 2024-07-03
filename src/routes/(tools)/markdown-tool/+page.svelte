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