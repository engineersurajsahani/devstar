<script>
    import { onMount } from "svelte";
    import { Button, Dropdown } from "flowbite-svelte";
    import toast, { Toaster } from "svelte-french-toast";
    import hljs from "highlight.js";
    import "highlight.js/styles/atom-one-dark.css";
  
    import Highlight from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    let textColor = "#000000"; // Default color
    let backgroundColor1 = "#5fe662"; // Default background color 1
    let backgroundColor2 = "#ffffff"; // Default background color 2
    let easing = "ease"; // Default easing
    let code;
    $: code = `a {
      font-size: 4em;
      font-weight: bold;
      font-family: sans-serif;
      text-decoration: none;
      color: ${textColor};
      background: linear-gradient(
          ${backgroundColor1},
          ${backgroundColor2}
        )
        repeat-x;
      background-position-x: 0%;
      background-position-y: 0%;
      background-size: auto;
      background-size: 200% 100%;
      background-position-x: 0;
      background-position-y: 2em;
      transition: background-position-y 0.6s ${easing};
      animation: waveAnimation 4s infinite linear;
      animation-play-state: running;
      animation-play-state: paused;
    }
       a:hover {
      background-position-x: 0;
      background-position-y: 0;
      animation-play-state: running;
    }
  
    @keyframes waveAnimation {
      from {
        background-position-x: 0%;
      }
      to {
        background-position-x: 200%;
      }
    }`;
    let htmlcode = `<a href="#"></a>`;
  
    //   this is to copy css code
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
  
    //   this is to copy html code
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
          --text-color: {textColor};
          --background-color1: {backgroundColor1};
          --background-color2: {backgroundColor2};
          --easing: {easing};
        "
        class="border-2 border-gray-500 p-2"
      >
        HELLO!
      </a>
    </div>
    <div class="flex justify-center gap-4">
      <div class="bg-gray-700 p-2 rounded-lg">
        <h1 class="text-gray-400">text color: {textColor}</h1>
        <input
          type="color"
          bind:value={textColor}
          on:input={() => {
            let b = document.querySelector(".css code");
  
            b.innerHTML = code;
            high();
          }}
        />
      </div>
      <div class="bg-gray-700 p-2 rounded-lg">
        <h1 class="text-gray-400">Background color 1: {backgroundColor1}</h1>
        <input
          type="color"
          bind:value={backgroundColor1}
          on:input={() => {
            let b = document.querySelector(".css  code");
            b.innerHTML = code;
            high();
          }}
        />
      </div>
      <div class="bg-gray-700 p-2 rounded-lg">
        <h1 class="text-gray-400">Background color 2: {backgroundColor2}</h1>
        <input
          type="color"
          bind:value={backgroundColor2}
          on:input={() => {
            let b = document.querySelector(".css code");
  
            b.innerHTML = code;
            high();
          }}
        />
      </div>
      <div class="bg-gray-700 p-2 rounded-lg">
        <h1 class="text-gray-400">Background color 2: {backgroundColor2}</h1>
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          bind:value={easing}
          on:change={() => {
            let b = document.querySelector(".css code");
  
            b.innerHTML = code;
            high();
          }}
        >
          <option value="ease">Ease</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In Out</option>
        </select>
      </div>
    </div>
  </div>
  
  <!-- html part of html -->
  <h2 class="font-bold text-white text-3xl">html code:</h2>
  <pre>
      <code>{htmlcode}</code>
  </pre>
  <button
    class="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    on:click={() => {
      copyToClipboardHtml();
      console.log(htmlcode);
    }}
    >Copy html
  </button>
  <!-- css part of html -->
  <h2 class="font-bold text-white text-3xl">css code:</h2>
  <pre class="css">
      <code>
          {code}
      </code>
  </pre>
  <button
    class="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    on:click={() => {
      copyToClipboardCss();
    }}
  >
    Copy css
  </button>
  <Toaster />
  
  <style>
    a {
      font-size: 4em;
      font-weight: bold;
      font-family: sans-serif;
      text-decoration: none;
      color: var(--text-color);
      background: linear-gradient(
          var(--background-color1),
          var(--background-color2)
        )
        repeat-x;
      background-position-x: 0%;
      background-position-y: 0%;
      background-size: auto;
      background-size: 200% 100%;
      background-position-x: 0;
      background-position-y: 2em;
      transition: background-position-y 0.6s var(--easing);
      animation: waveAnimation 4s infinite linear;
      animation-play-state: running;
      animation-play-state: paused;
    }
  
    a:hover {
      background-position-x: 0;
      background-position-y: 0;
      animation-play-state: running;
    }
  
    @keyframes waveAnimation {
      from {
        background-position-x: 0%;
      }
      to {
        background-position-x: 200%;
      }
    }
  </style>