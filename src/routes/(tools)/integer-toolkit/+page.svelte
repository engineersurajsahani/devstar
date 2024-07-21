<script lang="ts">
  import { onMount } from "svelte";

  let palindromeType = "mirrored";
  let inputText = "";
  let resultText = "";

  function generatePalindrome() {
    if (palindromeType === "mirrored") {
      resultText = mirroredPalindrome(inputText);
    } else if (palindromeType === "centered") {
      resultText = centeredPalindrome(inputText);
    } else if (palindromeType === "minimal") {
      resultText = minimalPalindrome(inputText);
    }
  }

  function mirroredPalindrome(input) {
    let reversed = input.split("").reverse().join("");
    return input + reversed;
  }

  function centeredPalindrome(input) {
    let reversed = input.split("").reverse().join("");
    return input + reversed.slice(1);
  }

  function minimalPalindrome(input) {
    let len = input.length;
    for (let i = 0; i < len; i++) {
      let prefix = input.slice(0, i);
      let suffix = input.slice(i);
      if (suffix === suffix.split("").reverse().join("")) {
        return input + prefix.split("").reverse().join("");
      }
    }
    return input;
  }

  $: if (inputText) generatePalindrome();
  $: if (palindromeType) generatePalindrome();
</script>

<div class="tools-container space-y-8">
  <!-- Integer Palindromizer -->
  <div class="tool">
    <h1 class="text-gray-900 text-2xl dark:text-white ml-12 font-medium">
      1. Integer Palindromizer
    </h1>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:px-12">
      <div
        class="card p-8 relative items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg"
      >
        <div class="flex gap-8 mb-4">
          <label class="flex flex-col items-center">
            <input
              type="radio"
              name="palindromeType"
              value="mirrored"
              class="mr-2"
              bind:group={palindromeType}
            />
            <span class="text-gray-900 text-sm dark:text-white"
              >Mirrored Palindrome</span
            >
            <span class="text-xs text-gray-500 dark:text-gray-400"
              >Example: 1232 → 12322321.</span
            >
          </label>
          <label class="flex flex-col items-center">
            <input
              type="radio"
              name="palindromeType"
              value="centered"
              class="mr-2"
              bind:group={palindromeType}
            />
            <span class="text-gray-900 text-sm dark:text-white"
              >Centered Palindrome</span
            >
            <span class="text-xs text-gray-500 dark:text-gray-400"
              >Example: 1232 → 1232321.</span
            >
          </label>
          <label class="flex flex-col items-center">
            <input
              type="radio"
              name="palindromeType"
              value="minimal"
              class="mr-2"
              bind:group={palindromeType}
            />
            <span class="text-gray-900 text-sm dark:text-white"
              >Minimal Palindrome</span
            >
            <span class="text-xs text-gray-500 dark:text-gray-400"
              >Example: 1232 → 12321.</span
            >
          </label>
        </div>

        <div
          class="mt-4 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
        >
          <div
            class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
          >
            <h2 class="text-lg font-medium text-gray-700 dark:text-white mb-2">
              Input Integers
            </h2>
            <textarea
              placeholder="Enter Integers"
              rows="8"
              class="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={inputText}
            ></textarea>
          </div>

          <div
            class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
          >
            <h2 class="text-lg font-medium text-gray-700 dark:text-white mb-2">
              Palindromic Integers
            </h2>
            <textarea
              placeholder="Result"
              rows="8"
              class="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={resultText}
              readonly
            ></textarea>
          </div>
        </div>

        <div
          class="items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 overflow-hidden"
        >
          <div
            class="mt-8 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
          >
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Copy
            </button>
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Download as txt
            </button>
            <!-- <button
  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
  Download as pdf
</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .card h2 {
    padding: 0.5rem 0;
  }
</style>
