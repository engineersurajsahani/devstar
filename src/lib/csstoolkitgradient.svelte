<script>
  import { onMount } from "svelte";
  import { Button, Dropdown } from "flowbite-svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/css";
  let textColor = "#000000"; // Default color
  let backgroundColor1 = "#5fe662"; // Default background color 1
  let backgroundColor2 = "#ffffff";
  let backgroundColor3 = "#000000"; // Default background color 2
  let easing = "ease"; // Default easing
  let degree = 11; // Default degree for gradient
  let degreestr;
  $: degreestr = degree.toString() + "deg";
  console.log(degreestr);
  $: console.log(degree);
  let code;

  $: code = `a {
      font-size: 4em;
      font-weight: bold;
      font-family: sans-serif;
      text-decoration: none;
      background: rgba(0, 0, 0, 0)
        linear-gradient(${degree}deg, ${backgroundColor1}, ${backgroundColor2}, ${backgroundColor3}) repeat scroll 0% 0%/200%
        200%;
      background-clip: border-box;
      color: transparent;
      background-clip: text;
      background-clip: text;
    }
  
    a:hover {
      animation: GradientAnimation 2s ${easing} infinite;
      animation: GradientAnimation 2s ${easing} infinite;
    }
  
    @keyframes GradientAnimation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }`;

  let htmlcode = `<a href="#"></a>`;

  // Function to copy CSS code
  function copyToClipboardCss() {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
        console.error(err);
      });
  }

  // Function to copy HTML code
  function copyToClipboardHtml() {
    navigator.clipboard
      .writeText(htmlcode)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
        console.error(err);
      });
  }

  function high() {
    const block = document.querySelector(".css code");
    const htmlblock = document.querySelector("pre code");
    if (block) {
      block.classList.remove("hljs"); // Remove the highlight class
      block.removeAttribute("data-highlighted"); // Unset the highlighted attribute
      block.innerHTML = code; // Update the code block content
      hljs.highlightElement(block); // Reapply the highlighting
      block.dataset.highlighted = true; // Set the highlighted attribute again
    }
    hljs.highlightElement(htmlblock);
  }
  onMount(() => {
    high();
  });
</script>

<div>
  <div class="flex justify-center mb-5">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href="#"
      style="
            --degggg: {degreestr};
            --background-color1: {backgroundColor1};
            --background-color2: {backgroundColor2};
            --background-color3: {backgroundColor3};
            --easing: {easing};
          "
      class="border-2 border-gray-500 p-2"
    >
      HELLO!
    </a>
  </div>
  <div class="flex justify-center gap-4">
    <div class="bg-gray-700 p-2 rounded-lg">
      <h1 class="text-gray-400">Background color 1: {backgroundColor1}</h1>
      <input type="color" bind:value={backgroundColor1} on:input={high} />
    </div>
    <div class="bg-gray-700 p-2 rounded-lg">
      <h1 class="text-gray-400">Background color 2: {backgroundColor2}</h1>
      <input type="color" bind:value={backgroundColor2} on:input={high} />
    </div>
    <div class="bg-gray-700 p-2 rounded-lg">
      <h1 class="text-gray-400">Background color 3: {backgroundColor3}</h1>
      <input type="color" bind:value={backgroundColor3} on:input={high} />
    </div>
    <div class="bg-gray-700 p-2 rounded-lg">
      <h1 class="text-gray-400">Animation timing: {easing}</h1>
      <select
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        bind:value={easing}
        on:change={high}
      >
        <option value="ease">Ease</option>
        <option value="ease-in">Ease In</option>
        <option value="ease-out">Ease Out</option>
        <option value="ease-in-out">Ease In Out</option>
      </select>
    </div>
    <div class="bg-gray-700 p-2 rounded-lg">
      <h1 class="text-gray-400">Gradient degree: {degree}°</h1>
      <input
        type="range"
        min="0"
        max="360"
        step="1"
        bind:value={degree}
        on:input={() => {
          high();
        }}
      />
    </div>
  </div>
</div>

<!-- HTML part -->
<h2 class="font-bold text-white text-3xl">html code:</h2>
<pre>
    <code>{htmlcode}</code>
  </pre>
<button
  class="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  on:click={copyToClipboardHtml}
>
  Copy HTML
</button>

<!-- CSS part -->
<h2 class="font-bold text-white text-3xl">css code:</h2>
<pre class="css">
    <code>{code}</code>
  </pre>
<button
  class="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  on:click={copyToClipboardCss}
>
  Copy CSS
</button>
<Toaster />

<style>
  a {
    font-size: 4em;
    font-weight: bold;
    font-family: sans-serif;
    text-decoration: none;
    background: rgba(0, 0, 0, 0)
      linear-gradient(
        var(--degggg),
        var(--background-color1),
        var(--background-color2),
        var(--background-color3)
      )
      repeat scroll 0% 0%/200% 200%;
    background-clip: border-box;
    color: transparent;
    background-clip: text;
    background-clip: text;
  }

  a:hover {
    animation: GradientAnimation 2s var(--easing) infinite;
    animation: GradientAnimation 2s var(--easing) infinite;
  }

  @keyframes GradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>