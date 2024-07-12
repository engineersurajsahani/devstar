<script>
  // imports
  import { onMount } from "svelte";
  import MetaTagInput from "./components/metaTagInput.svelte";
  import MetaTagsDisplay from "./components/metaTagsDisplay.svelte";
  import MetaTagGenerator from "./components/metaTagGenerator.svelte";

  let url = "https://metatags.io/";
  let metaTags = null;
  let loading = false;
  let error = null;

  // function to fetch metatags
  async function fetchMetaTags(url) {
    loading = true;
    try {
      const response = await fetch("/metatag-checker-generator/api/meta-tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      metaTags = await response.json();
      // console.log("this is data", metaTags)
      // console.log("this is data err", metaTags.error)
      error = null;
    } catch (err) {
      console.error("Error fetching meta tags:", err);
      error = "Error fetching meta tags";
      metaTags = null;
    } finally {
      loading = false;
    }
  }

  // function to check url
  function handleCheck(event) {
    url = event.detail.url;
    if (!url) {
      error = "Please enter a URL";
      return;
    }
    fetchMetaTags(url);
  }

  onMount(() => {
    fetchMetaTags(url);
  });
</script>

<main class="w-full container mx-auto px-4 py-8">
  <div class="flex items-center flex-col justify-center">
    <h1
      class="font-bold text-2xl sm:text-3xl tracking-tight leading-none text-gray-900 dark:text-white mb-6"
    >
      Metatag Checker
    </h1>

    <MetaTagInput {url} {loading} on:check={handleCheck} />
  </div>
  
  <div class="min-h-[700px] flex flex-col md:flex-row items-start ">
    <MetaTagGenerator bind:metaTags />
    <MetaTagsDisplay {metaTags} {error} {url} />
  </div>
</main>

