<script>
  import { fade } from "svelte/transition";

  export let metaTags = null;
  // console.log("this is dispaly", metaTags);
  export let error = null;
  export let url = "";
  export let loading = false;
</script>

<!-- when normal error  -->
{#if error}
  <p
    class="text-red-500 text-center w-full md:w-[50%] mt-8 flex-auto p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    {error}
  </p>
  <!-- when there is error on serverside -->
{:else if metaTags && metaTags.error}
  <p
    class="text-red-500 text-center w-full md:w-[50%] mt-8 flex-auto p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    {metaTags.error}
  </p>
  <!-- if nither than our content -->
{:else}
  <div
    class="w-full md:w-[50%] flex-auto p-5 bg-white dark:bg-gray-800 dark:border-gray-700flex flex-col justify-center items-center"
    transition:fade
  >
    <h2
      class="text-xl mb-4 text-center font-extrabold tracking-tight leading-none text-gray-900 border-b pb-4 dark:text-white"
    >
      Meta Tags for {url}
    </h2>
    <div
      class="w-full mt-8 flex-auto bg-white dark:bg-gray-800 dark:border-gray-700"
      transition:fade
    >
      <h3 class="text-[#a3b3ca]">Google</h3>
      {#if metaTags}
        <h1
          class="block cursor-pointer text-ellipsis whitespace-nowrap text-[#1a0dab] text-xl tracking-normal"
        >
          {metaTags.metaTags.title || metaTags.metaTags["og:title"]}
        </h1>
        <p class="text-[#006621] tracking-tighter text-sm cursor-pointer">
          {metaTags.metaTags.url || metaTags.metaTags["og:url"]}
        </p>
        <p class="text-[#545454] tracking-tighter text-sm">
          {metaTags.metaTags.description || metaTags.metaTags["og:description"]}
        </p>
      {/if}
    </div>
    <div
      class="w-full mt-8 flex-auto p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      transition:fade
    >
      <!-- if any loading then display skeleton -->
      {#if loading}
        <h2
          class="text-xl mb-4 text-center font-extrabold tracking-tight leading-none text-gray-900 border-b pb-4 dark:text-white"
        >
          Loading Meta Tags...
        </h2>
        <div class="flex justify-center items-center h-32">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-white"
          ></div>
        </div>
        <!-- else display our content -->
      {:else if metaTags}
        <div>
          {#if metaTags.metaTags["og:image"]}
            <img
              src={metaTags.metaTags["og:image"]}
              alt="sss"
              class="rounded-md mb-2"
            />
          {/if}
          <ul class="space-y-2">
            {#each Object.entries(metaTags.metaTags) as [key, value]}
              <li class="dark:text-white"><strong>{key}:</strong> {value}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
  </div>
{/if}
