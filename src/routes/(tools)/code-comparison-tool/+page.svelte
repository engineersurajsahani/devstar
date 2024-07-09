<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { DiffChecker } from './lib/diffchecker';
  import { compareDocument } from './lib/diffchecker.document';
  import { compareText } from './lib/diffchecker.text';

  let originalText: string = '';
  let changedText: string = '';
  let originalFile: File | null = null;
  let changedFile: File | null = null;
  let diffResults: string | null = null;
  let activeTab = 'text'; // Default to text tab

  const handleOriginalFileChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      originalFile = fileInput.files[0];
    }
  };

  const handleChangedFileChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      changedFile = fileInput.files[0];
    }
  };

  const handleOriginalTextChange = (event: Event) => {
    originalText = (event.target as HTMLTextAreaElement).value;
  };

  const handleChangedTextChange = (event: Event) => {
    changedText = (event.target as HTMLTextAreaElement).value;
  };

  const handleCompare = async () => {
    try {
      if (activeTab === 'text') {
        diffResults = await compareText(originalText, changedText);
      } else if (activeTab === 'document') {
        if (!originalFile || !changedFile) {
          return; // Handle cases where files are missing
        }
        diffResults = await compareDocument(originalFile, changedFile);
      }
    } catch (error) {
      console.error('Error during comparison:', error);
      diffResults = 'Error comparing files';
    }
  };

  onMount(() => {
    if (browser) {
      // Initialize DiffChecker
      const diffchecker = new DiffChecker();

      // Example usage: Compare two text strings
      diffchecker
        .compare('This is the original text.', 'This is the changed text.')
        .then((results) => {
          console.log(results);
        });

      // Example usage: Compare two files
      diffchecker
        .compare('original.txt', 'changed.txt')
        .then((results) => {
          console.log(results);
        });
    }
  });

  const handleTabClick = (tab: string) => {
    activeTab = tab;
  };

  // Define a data structure for the tabs
  const tabs = [
    {
      id: 'text',
      name: 'Text',
    },
    {
      id: 'document',
      name: 'Document',
    },
  ];
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-center mb-8">Diffchecker</h1>

  <div class="flex justify-center mb-8">
    {#each tabs as tab}
      <button
        class={`px-4 py-2 rounded-md font-medium text-sm ${
          activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        on:click={() => handleTabClick(tab.id)}
      >
        {tab.name}
      </button>
    {/each}
  </div>

  {#if activeTab === 'text'}
    <div class="grid grid-cols-1 gap-4">
      <div>
        <label for="originalText" class="block text-sm font-medium text-gray-700">
          Original Text
        </label>
        <textarea
          id="originalText"
          rows="10"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          bind:value={originalText}
        />
      </div>
      <div>
        <label for="changedText" class="block text-sm font-medium text-gray-700">
          Changed Text
        </label>
        <textarea
          id="changedText"
          rows="10"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          bind:value={changedText}
        />
      </div>
    </div>
  {/if}

  {#if activeTab === 'document'}
    <div class="grid grid-cols-1 gap-4">
      <div>
        <label for="originalFile" class="block text-sm font-medium text-gray-700">
          Original File
        </label>
        <input
          type="file"
          id="originalFile"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          on:change={handleOriginalFileChange}
        />
      </div>
      <div>
        <label for="changedFile" class="block text-sm font-medium text-gray-700">
          Changed File
        </label>
        <input
          type="file"
          id="changedFile"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          on:change={handleChangedFileChange}
        />
      </div>
    </div>
  {/if}

  <button
    class="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
    on:click={handleCompare}
  >
    Compare
  </button>

  {#if diffResults}
    <pre class="mt-4 border rounded-md p-4 overflow-auto whitespace-pre-wrap bg-gray-100 text-gray-700">
      {diffResults}
    </pre>
  {/if}
</div>