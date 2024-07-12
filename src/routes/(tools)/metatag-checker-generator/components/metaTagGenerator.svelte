<script>
  import { Modal } from "flowbite-svelte";
  // import { onMount } from "svelte";
  import MetaTagCodeModal from "./metaTagCodeModal.svelte";
  export let metaTags = null;
  // console.log("this is gene", metaTags.metaTags.title);

  let popupModal = false;
  let imageUrl = "";
  let imageName = "";
  let title = "";
  let description = "";
  let url = "";
  let name = "";
  let contentType = "web";
  let author = "";
  let showContentType = false;
  let showAuthor = false;
  let showOpenGraph = false;
  let showTwitterCard = false;

  let ogTitle = "";
  let ogDescription = "";
  let ogImageUrl = "";
  let ogUrl = "";
  let ogSiteName = "";

  let twitterCardType = "summary_large_image";
  let twitterTitle = "";
  let twitterDescription = "";
  let twitterImage = "";

  let isInitialized = false;

  let errors = {};

  $: if (metaTags && metaTags.metaTags) {
    imageUrl = metaTags.metaTags["og:image"] || "";
    title = metaTags.metaTags.title || metaTags.metaTags["og:title"] || "";
    description =
      metaTags.metaTags.description ||
      metaTags.metaTags["og:description"] ||
      "";
    url = metaTags.metaTags["og:url"] || "";
    isInitialized = true;
  }

  // upload functionality to show name of file and display preview
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      imageUrl = URL.createObjectURL(file);
      imageName = file.name;
      updateMetaTags();
    }
  }

  // validation of frm which is required
  function validateForm() {
    errors = {};
    if (!imageUrl) errors.image = "Please upload an image";
    if (!title.trim()) errors.title = "Please enter a title";
    if (!description.trim()) errors.description = "Please enter a description";
    if (!url.trim()) errors.url = "Please enter a url";
    // if (!name.trim()) errors.name = "Please enter a url";
    return Object.keys(errors).length === 0;
  }

  function updateMetaTags() {
    metaTags = {
      ...metaTags,
      metaTags: {
        ...metaTags.metaTags,
        title: title,
        description: description,
        "og:title": title,
        "og:description": description,
        url: url,
        "og:url": url,
        "og:image":imageUrl,  
      },
    };
  }

  function handleInput(field, event) {
    if (field === "title") title = event.target.value;
    if (field === "description") description = event.target.value;
    if (field === "url") url = event.target.value;
    updateMetaTags();
  }

  function handleSubmit() {
    updateMetaTags();
    if (validateForm()) {
      // console.log({
      //   imageUrl,
      //   imageName,
      //   title,
      //   description,
      //   url,
      //   name,
      //   contentType,
      //   author,
      //   ogTitle,
      //   ogDescription,
      //   ogImageUrl,
      //   ogUrl,
      //   ogSiteName,
      //   twitterCardType,
      //   twitterTitle,
      //   twitterDescription,
      //   twitterImage,
      // });
      popupModal = true;
    }
  }

  // onMount(() => {
  //   if (showContentType) {
  //     contentType = "web";
  //   }
  // });
</script>

<!-- <div class="flex flex-col mt-8"> -->
<!-- container -->
<div
  class="mr-0 mt-0 md:mr-10 md:mt-8 p-5 h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full md:w-[40%]"
>
  <!-- heading div -->
  <div
    class="text-xl mb-4 text-center font-extrabold tracking-tight leading-none text-gray-900 pb-4 border-b dark:text-white"
  >
    <h1>MetaTag Generator</h1>
  </div>
  <!-- form with input like dragdrop title and descrp -->
  <form class="max-w-md mx-auto" on:submit|preventDefault={handleSubmit}>
    <!-- this is div for image upload   -->
    <div class="flex flex-col mb-5">
      <h1 class="text-sm text-gray-500 dark:text-gray-400 m-1">Image</h1>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
        >
          {#if imageUrl}
            <img
              src={imageUrl}
              alt="Selected pic"
              class="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div
              class="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center"
            >
              <span class="text-white text-sm">{imageName}</span>
              <svg
                class="w-8 h-8 mb-4 text-black dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <!-- <span>Upload</span> -->
            </div>
          {:else}
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG (MAX. 800x400px)
              </p>
            </div>
          {/if}
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            on:change={handleFileChange}
            accept="image/svg+xml,image/png,image/jpeg"
          />
        </label>
      </div>
    </div>

    <!-- err for image if not uploaded -->
    {#if errors.image}
      <p class="text-red-500 text-xs mt-1">{errors.image}</p>
    {/if}

    <!-- this is div for title   -->
    <div class="relative z-0 w-full mb-5 mt-3 group">
      <input
        type="text"
        name="floating_title"
        id="floating_title"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={title}
        on:input={(e) => handleInput("title", e)}
        required
      />
      <label
        for="floating_title"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Title</label
      >
    </div>
    <!-- err for title if not uploaded -->
    {#if errors.title}
      <p class="text-red-500 text-xs mt-1">{errors.title}</p>
    {/if}

    <!-- this is description area -->
    <div class="relative z-0 w-full mb-5 group">
      <label
        for="message"
        class="text-sm text-gray-500 block mb-2 font-medium dark:text-white"
        >Your message</label
      >
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
        value={description}
        on:input={(e) => handleInput("description", e)}
      ></textarea>
      {#if errors.description}
        <p class="text-red-500 text-xs mt-1">{errors.description}</p>
      {/if}
    </div>

    <!-- this is div for url of site   -->
    <div class="relative z-0 w-full mb-5 mt-3 group">
      <input
        type="text"
        name="floating_title"
        id="floating_title"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={url}
        on:input={(e) => handleInput("url", e)}
        required
      />
      <label
        for="floating_title"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >URL of site</label
      >
    </div>
    <!-- err for url if not uploaded -->
    {#if errors.url}
      <p class="text-red-500 text-xs mt-1">{errors.url}</p>
    {/if}

    <!-- this is div for url of site   -->
    <div class="relative z-0 w-full mb-5 mt-3 group">
      <input
        type="text"
        name="floating_title"
        id="floating_title"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        bind:value={name}
      />
      <label
        for="floating_title"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Name of site</label
      >
    </div>
    <!-- err for nmae if not uploaded -->
    {#if errors.name}
      <p class="text-red-500 text-xs mt-1">{errors.name}</p>
    {/if}

    <!-- if checkbox selected for contentType -->
    {#if showContentType}
      <div class="relative z-0 w-full mb-5 mt-3 group">
        <label
          for="contentType"
          class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >Select an option</label
        >
        <select
          id="contentType"
          bind:value={contentType}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="article">Articles</option>
          <option value="web">Website</option>
          <option value="product">Product</option>
        </select>
      </div>
    {/if}

    <!-- if checkbox selected for Author -->
    {#if showAuthor}
      <div class="relative z-0 w-full mb-5 mt-3 group">
        <input
          type="text"
          name="floating_author"
          id="floating_author"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          bind:value={author}
        />
        <label
          for="floating_author"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Author</label
        >
      </div>
    {/if}

    <!-- show graph display in form -->
    {#if showOpenGraph}
      <!-- heading -->
      <div>
        <h1 class="font-bold text-gray-500 dark:text-gray-400 mb-3">
          Show Graph
        </h1>
      </div>

      <!-- 2 inputs in one col -->
      <div class="flex">
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_ogTitle"
            id="floating_ogTitle"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            bind:value={ogTitle}
          />
          <label
            for="floating_ogTitle"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >OG Title</label
          >
        </div>
        <div class="relative z-0 w-full mb-5 group ml-4">
          <input
            type="text"
            name="floating_ogSiteName"
            id="floating_ogSiteName"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            bind:value={ogSiteName}
          />
          <label
            for="floating_ogSiteName"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >OG Site Name</label
          >
        </div>
      </div>

      <!-- ogdescription -->
      <div class="relative z-0 w-full mb-5 group">
        <textarea
          type="text"
          rows="2"
          name="floating_ogDescription"
          id="floating_ogDescription"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          bind:value={ogDescription}
        />
        <label
          for="floating_ogDescription"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >OG Description</label
        >
      </div>

      <!-- og:image url -->
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_ogImageUrl"
          id="floating_ogImageUrl"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          bind:value={ogImageUrl}
        />
        <label
          for="floating_ogImageUrl"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >OG Image URL</label
        >
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_ogUrl"
          id="floating_ogUrl"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          bind:value={ogUrl}
        />
        <label
          for="floating_ogUrl"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >OG URL</label
        >
      </div>
    {/if}

    <!-- if checkbox selected for twitter card -->
    {#if showTwitterCard}
      <!-- card type of twitter -->
      <div class="relative z-0 w-full mb-5 group">
        <label
          for="twitterCardType"
          class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >Twitter Card Type</label
        >
        <select
          id="twitterCardType"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          bind:value={twitterCardType}
        >
          <option value="summary">Summary</option>
          <option value="summary_large_image">Summary Large Image</option>
        </select>
      </div>

      <!-- twittertitle -->
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_twitterTitle"
          id="floating_twitterTitle"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          bind:value={twitterTitle}
        />
        <label
          for="floating_twitterTitle"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Twitter Card Title</label
        >
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <textarea
          type="text"
          rows="2"
          name="floating_twitterDescription"
          id="floating_twitterDescription"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          bind:value={twitterDescription}
        />
        <label
          for="floating_twitterDescription"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Twitter Card Description</label
        >
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_twitterImage"
          id="floating_twitterImage"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          bind:value={twitterImage}
        />
        <label
          for="floating_twitterImage"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Twitter Card Image URL</label
        >
      </div>
    {/if}

    <!-- div for checkboxes -->
    <div class="grid grid-cols-2 gap-5 items-center justify-center">
      <!-- add content type -->
      <div class="flex items-center mb-5">
        <input
          id="showContentType"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          bind:checked={showContentType}
        />
        <label
          for="showContentType"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Add Content Type</label
        >
      </div>
      <!-- author -->
      <div class="flex items-center mb-5">
        <input
          id="showAuthor"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          bind:checked={showAuthor}
        />
        <label
          for="showAuthor"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Add Author</label
        >
      </div>
      <!-- open graph -->
      <div class="flex items-center mb-5">
        <input
          id="showOpenGraph"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          bind:checked={showOpenGraph}
        />
        <label
          for="showOpenGraph"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Add Open Graph tags</label
        >
      </div>
      <!-- twitter card -->
      <div class="flex items-center mb-5">
        <input
          id="showTwitterCard"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          bind:checked={showTwitterCard}
        />
        <label
          for="showTwitterCard"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Add Twitter Card tags</label
        >
      </div>
    </div>

    <!-- this is div for button -->
    <div class="flex justify-center items-center">
      <button
        type="submit"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
        >Get Code</button
      >
    </div>
  </form>
</div>

<Modal
  class="bg-gradient-to-t from-black via-gray-800 to-gray-700 text-white"
  title="Devstar MetaTag Generator"
  bind:open={popupModal}
  size="lg"
>
  <div class="p-4">
    <h1 class="text-center font-bold md:text-2xl mb-4">MetaTags Code</h1>
    <MetaTagCodeModal
      {imageUrl}
      {title}
      {description}
      {url}
      {name}
      {contentType}
      {author}
      {ogTitle}
      {ogDescription}
      {ogImageUrl}
      {ogUrl}
      {ogSiteName}
      {twitterCardType}
      {twitterTitle}
      {twitterDescription}
      {twitterImage}
    />
  </div>
</Modal>

<style>
  /* :global(.custom-modal) {
    margin: 10px;
    max-height: 90vh !important;
    overflow: hidden !important;
  }

  :global(.custom-modal > div > div) {
    flex-grow: 1 !important;
    overflow-y: visible !important;
  } */
</style>
