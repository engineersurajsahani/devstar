<script>
    import { diffLines } from 'diff';
    import { TabItem, Tabs } from 'flowbite-svelte';
    import Prism from 'prismjs';
    import 'prismjs/themes/prism.css';
    import { onMount } from 'svelte';

    // Code comparison variables and functions
    let code1 = '';
    let code2 = '';
    let comparisonResult = [];

    function compareCode() {
        const lines1 = code1.split('\n');
        const lines2 = code2.split('\n');

        comparisonResult = lines1.map((line, index) => {
            return {
                line1: line,
                line2: lines2[index] || '',
                isEqual: line === (lines2[index] || '')
            };
        });

        Prism.highlightAll();
    }

    // Calculate similarity percentage
    function calculateSimilarity() {
        let totalLines = comparisonResult.length;
        let identicalLines = comparisonResult.filter(result => result.isEqual).length;
        let similarityPercentage = (identicalLines / totalLines) * 100;

        return similarityPercentage.toFixed(2);
    }

    // File comparison variables and functions
    let file1Content = '';
    let file2Content = '';
    let diffResult = '';
    let linesAdded = 0;
    let linesRemoved = 0;

    function handleFileUpload(event, setContent) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setContent(e.target.result);
        reader.readAsText(file);
    }

    function compareFiles() {
        const diff = diffLines(file1Content, file2Content);
        linesAdded = 0;
        linesRemoved = 0;
        diffResult = diff.map(part => {
            const color = part.added ? 'green' :
                part.removed ? 'red' : 'black';
            const prefix = part.added ? '+' :
                part.removed ? '-' : ' ';
            if (part.added) linesAdded += part.count;
            if (part.removed) linesRemoved += part.count;
            return `<span style="color:${color}">${prefix} ${part.value}</span>`;
        }).join('');

        Prism.highlightAll();
    }

    // Initialize Prism syntax highlighting on mount
    onMount(() => {
        Prism.highlightAll();
    });
</script>

<style>
    /* No additional styles needed as we are using Tailwind CSS classes */
    .code-snippet {
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: anywhere;
    }
</style>

<div class="max-w-screen-xl mx-auto">
    <div class="tab-container">
        <!-- Tab Menu -->
        <Tabs tabStyle="underline" class="w-1/2">
            <TabItem open title="Code Comparison">
                <!-- Code Comparison Tool -->
                <div class="flex">
                    <div class="w-1/2 pr-4">
                        <textarea class="w-full h-64 border bg-gray-50 dark:bg-gray-900 border-gray-300 rounded-lg p-4 dark:text-slate-100 language-javascript" placeholder="Enter code snippet 1..." bind:value={code1}></textarea>
                    </div>
                    <div class="w-1/2 pl-4">
                        <textarea class="w-full h-64 border bg-gray-50 dark:bg-gray-900 border-gray-300 rounded-lg p-4 dark:text-slate-100 language-javascript" placeholder="Enter code snippet 2..." bind:value={code2}></textarea>
                    </div>
                </div>
                <div class="mt-4 text-center">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={compareCode}>Compare Code</button>
                </div>
                <div class="mt-4">
                    {#if comparisonResult.length > 0}
                        {#each comparisonResult as { line1, line2, isEqual }, index}
                            <div class={isEqual ? 'bg-green-100' : 'bg-red-100'} border border-gray-200 rounded-lg p-2 mb-2 break-words whitespace-pre-wrap>
                                <div class="text-sm text-gray-600">Line {index + 1}</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="code-snippet"><pre class="whitespace-pre-wrap break-words"><code class="language-javascript">{line1}</code></pre></div>
                                    <div class="code-snippet"><pre class="whitespace-pre-wrap break-words"><code class="language-javascript">{line2}</code></pre></div>
                                </div>
                            </div>
                        {/each}
                       <div class="mt-4 text-center">
                            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={() => {
                                if (confirm('Are you sure you want to reset the code comparison?')) {
                                    code1 = '';
                                    code2 = '';
                                    comparisonResult = [];
                                }
                            }}>Reset Code Comparison</button>
                        </div>
                        <div class="mt-4 text-center">
                            <p>Similarity: {calculateSimilarity()}%</p>
                        </div>
                    {:else}
                        <p class="text-gray-500 text-center">Compare results will appear here.</p>
                    {/if}
                </div>
            </TabItem>
            <TabItem title="File Comparison">
                <!-- File Comparison Tool -->
                <div class="max-w-screen-xl mx-auto p-4">
                    <div class="grid gap-4 lg:grid-cols-2">
                        <div>
                            <label for="file1" class="block text-sm font-medium text-gray-700 dark:text-slate-100">Original text</label>
                            <div class="flex items-center mt-1">
                                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" on:click={() => document.getElementById('file1').click()}>Choose File</button>
                                <span class="ml-4 text-gray-700 dark:text-slate-100" id="file1Name">No file chosen</span>
                                <input id="file1" type="file" accept=".txt" class="hidden" on:change={(event) => handleFileUpload(event, content => file1Content = content)} />
                            </div>
                        </div>
                        <div>
                            <label for="file2" class="block text-sm font-medium text-gray-700 dark:text-slate-100">Changed text</label>
                            <div class="flex items-center mt-1">
                                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" on:click={() => document.getElementById('file2').click()}>Choose File</button>
                                <span class="ml-4 text-gray-700 dark:text-slate-100" id="file2Name">No file chosen</span>
                                <input id="file2" type="file" accept=".txt" class="hidden" on:change={(event) => handleFileUpload(event, content => file2Content = content)} />
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4 mt-4">
                        <div class="flex-1 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                            <textarea readonly class="w-full h-64 border-0 bg-transparent resize-none" bind:value={file1Content}></textarea>
                        </div>
                        <div class="flex-1 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                            <textarea readonly class="w-full h-64 border-0 bg-transparent resize-none" bind:value={file2Content}></textarea>
                        </div>
                    </div>

                    <div class="mt-4 text-center">
                        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={compareFiles}>Compare Code</button>
                    </div>

                    <div class="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-slate-100">
						<h3 class="text-lg font-medium">Differences</h3>
						<pre class="whitespace-pre-wrap"><code>{@html diffResult}</code></pre>
						<div class="mt-2">
							<p>Lines added: {linesAdded}</p>
							<p>Lines removed: {linesRemoved}</p>
						</div>
					</div>
				</TabItem>
			</Tabs>
		</div>
	</div>