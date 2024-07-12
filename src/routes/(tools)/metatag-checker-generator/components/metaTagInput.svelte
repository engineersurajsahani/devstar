<script>
  import { createEventDispatcher } from "svelte";

  export let url = "https://metatags.io/";
  export let loading = false;

  let isValidUrl = true;
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  function validateUrl(input) {
    const trimmedInput = input.trim();
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(trimmedInput);
  }

  // function handleInput() {
  //   isValidUrl = validateUrl(url);
  //   errorMessage = isValidUrl ? "" : "Please enter a valid URL";
  // }

  function handleInput(event) {
    url = event.target.value;
    isValidUrl = validateUrl(url);
    errorMessage = isValidUrl ? "" : "Please enter a valid URL";
  }

  async function handleCheck() {
    const trimmedUrl = url.trim();
    if (validateUrl(trimmedUrl)) {
      isValidUrl = true;
      errorMessage = "";
      try {
        dispatch("check", { url: trimmedUrl });
      } catch (error) {
        errorMessage =
          "Failed to fetch meta tags. Please check your internet connection or try again later.";
      }
    } else {
      isValidUrl = false;
      errorMessage = "Please enter a valid URL";
    }
  }
  // function handleCheck() {
  //   dispatch("check", { url });
  // }
</script>

<div class="my-3 flex flex-col md:flex-row justify-center items-center">
  <div class="flex">
    <input
      type="text"
      bind:value={url}
      on:input={handleInput}
      placeholder="https://google.com"
      class="rounded-md w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 px-3 border border-gray-300"
    />
    <button
      on:click={handleCheck}
      class="bg-black text-sm p-2 px-2 text-white rounded-md ml-3 hover:bg-gray-800 transition duration-200 ease-in-out"
      disabled={loading || !isValidUrl}
    >
      {#if loading}
        Checking...
      {:else}
        <span class="block sm:hidden">Check</span>
        <span class="hidden sm:block">Check MetaTags</span>
      {/if}
    </button>
  </div>
  <div class="md:ml-4">
    {#if errorMessage}
      <p class="text-red-500 text-sm mt-1">{errorMessage}</p>
    {/if}
  </div>
</div>
