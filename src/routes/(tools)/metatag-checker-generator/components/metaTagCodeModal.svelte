<script>
  let copySuccess = false;

  function copyContent() {
    const el = document.getElementById("metaContent");
    if (el) {
      navigator.clipboard
        .writeText(el.innerText)
        .then(() => {
          copySuccess = true;
          setTimeout(() => {
            copySuccess = false;
          }, 1500);
        })
        .catch((err) => {
          console.error("Unable to copy to clipboard: ", err);
        });
    }
  }

  export let imageUrl;
  export let title;
  export let description;
  // export let imageName;
  export let url;
  export let name;
  export let contentType = "web";
  export let author;

  export let ogTitle;
  export let ogDescription;
  export let ogImageUrl;
  export let ogUrl;
  export let ogSiteName;

  export let twitterCardType = "summary_large_image";
  export let twitterTitle;
  export let twitterDescription;
  export let twitterImage;

  $: ogMetaTitle = ogTitle ? ogTitle : title;
  $: TMetaTitle = twitterTitle ? twitterTitle : title;

  $: ogMetadDes = ogDescription ? ogDescription : description;
  $: TMetaDes = twitterDescription ? twitterDescription : description;

  $: ogMetaImage = ogImageUrl ? ogImageUrl : imageUrl;
  $: TMetaImage = twitterImage ? twitterImage : imageUrl;

  $: ogMetaURL = ogUrl ? ogUrl : url;
  $: ogMetaName = ogSiteName ? ogSiteName : name;
</script>

<div class="group relative">
  <button
    style="z-index: 10;"
    class="hidden group-hover:block absolute top-0 left-0 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 flo"
    on:click={copyContent}
  >
    {copySuccess ? "Copied!" : "Copy"}
  </button>
  <div
    class="bg-[#ebf1fa] overflow-auto rounded-md p-5 cursor-pointer group relative"
  >
    <pre id="metaContent" class=" "><code class="ml-[200px]">
  <span class="text-green-500">&lt;!-- Primary Meta Tags --&gt;</span>
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">title</span>&gt;</span
        ><span class="text-amber-700">{title}</span><span class="text-gray-500"
          >&lt;/<span class="text-blue-600">title</span>&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">name</span
          >=<span class="text-amber-700">"title"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">{title}</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">name</span
          >=<span class="text-amber-700">"description"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">{description}</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">name</span
          >=<span class="text-amber-700">"Site Name"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">{name}</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">name</span
          >=<span class="text-amber-700">"url"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">{url}</span> /&gt;</span
        >
  
  <span class="text-green-500">&lt;!-- Open Graph / Facebook --&gt;</span>
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"og:type"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{contentType}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"og:url"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{ogMetaURL}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"og:title"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{ogMetaTitle}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"og:description"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{ogMetadDes}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"og:image"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{ogMetaImage}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">name</span
          >=<span class="text-amber-700">"Site Name"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">{ogMetaName}</span> /&gt;</span
        >
  
  <span class="text-green-500">&lt;!-- Twitter --&gt;</span>
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"twitter:card"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{twitterCardType}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"twitter:url"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{url}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"twitter:title"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{TMetaTitle}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"twitter:description"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{TMetaDes}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">property</span
          >=<span class="text-amber-700">"twitter:image"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">"{TMetaImage}"</span> /&gt;</span
        >
  <span class="text-gray-500"
          >&lt;<span class="text-blue-600">meta</span> <span
            class="text-blue-400">name</span
          >=<span class="text-amber-700">"auhor"</span> <span
            class="text-blue-400">content</span
          >=<span class="text-amber-700">{author}</span> /&gt;</span
        >
  
  <span class="text-green-500"
          >&lt;!-- Meta Tags Generated with Devstar contributors --&gt;</span
        ></code
      ></pre>
  </div>
</div>

<style>
</style>
