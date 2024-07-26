<script lang="ts">
  import { onMount } from "svelte";

  // Common Code

  function showAlert(message: string) {
    // Create alert element
    const alert = document.createElement("div");
    alert.style.position = "fixed";
    alert.style.top = "100px";
    alert.style.right = "20px";
    alert.style.backgroundColor = "#4caf50"; // Green background
    alert.style.color = "white"; // White text
    alert.style.padding = "15px";
    alert.style.borderRadius = "5px";
    alert.style.zIndex = "1000";
    alert.style.fontSize = "16px";
    alert.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    alert.innerText = message;
    document.body.appendChild(alert);

    // Remove alert after 3 seconds
    setTimeout(() => {
      document.body.removeChild(alert);
    }, 3000);
  }

  function copyText(text: string) {
    if (text.length > 0) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      showAlert("Copied to Clipboard! ✅");
    }
  }

  function downloadText(text: string, filename: string) {
    if (text.length > 0) {
      const blob = new Blob([text], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showAlert("File downloaded successfully! 📥");
    }
  }

  // Variables for Integer Palindromizer
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

  // Variables for Integer Array Generator
  let arrayType = "linear";
  let startValue = 0;
  let stepValue = 2;
  let lengthValue = 10;
  let rangeStartValue = 0;
  let rangeEndValue = 100;
  let randomLengthValue = 10;
  let parenthesesType = "square";
  let integerArray = "";

  function generateIntegerArray() {
    let arrayString = "";

    if (arrayType === "linear") {
      arrayString = generateLinearArray(startValue, stepValue, lengthValue);
    } else if (arrayType === "random") {
      arrayString = generateRandomArray(
        rangeStartValue,
        rangeEndValue,
        randomLengthValue
      );
    }

    // Wrapping the arrayString in the selected parentheses type
    integerArray = wrapWithParentheses(arrayString, parenthesesType);
  }

  function generateLinearArray(start, step, length) {
    return Array.from({ length }, (_, i) => start + i * step).join(", ");
  }

  function generateRandomArray(min, max, length) {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    ).join(", ");
  }

  function wrapWithParentheses(arrayString, parenthesesType) {
    switch (parenthesesType) {
      case "curly":
        return `{${arrayString}}`;
      case "square":
        return `[${arrayString}]`;
      case "round":
        return `(${arrayString})`;
      default:
        return `[${arrayString}]`; // Default to square brackets
    }
  }

  $: if (parenthesesType) generateIntegerArray();

  $: {
    if (
      arrayType === "linear" &&
      startValue != null &&
      stepValue != null &&
      lengthValue != null
    ) {
      generateIntegerArray();
    } else if (
      arrayType === "random" &&
      rangeStartValue != null &&
      rangeEndValue != null &&
      randomLengthValue != null
    ) {
      generateIntegerArray();
    }
  }

  // Variables for Integer Adder
  let intSeparator = ",";
  let inputIntegers = "";
  let integerSum = "";
  let showPartialSums = false;
  let showSumTerms = false;

  function calculateSum() {
    const numbers = inputIntegers
      .trim()
      .split(intSeparator)
      .map((num) => num.trim())
      .filter((num) => num !== ""); // Filter out empty strings

    // Filter out any NaN values
    const validNumbers = numbers.map(Number).filter((num) => !isNaN(num));

    if (showPartialSums) {
      // Calculate partial sums
      let runningSum = 0;
      integerSum = validNumbers
        .map((num, index) => {
          runningSum += num;
          if (showSumTerms) {
            const terms = validNumbers.slice(0, index + 1).join(" + ");
            return `${runningSum} (${terms})`;
          } else {
            return runningSum.toString();
          }
        })
        .join("\n");
    } else {
      // Calculate the sum of the numbers
      const sum = validNumbers.reduce((acc, num) => acc + num, 0);
      if (showSumTerms) {
        const terms = validNumbers.join(" + ");
        integerSum = `${sum} (${terms})`;
      } else {
        integerSum = sum.toString();
      }
    }
  }

  $: inputIntegers, intSeparator, showPartialSums, showSumTerms, calculateSum();

  // Variables for Integer / Integer Array Sorter
  let intInputType = "integers";
  let inputIntegersNew = "";
  let sortedIntegers = "";
  let intSeparatorNew = ",";
  let sortingOrderNew = "ascending";

  $: {
    if (intInputType && inputIntegersNew !== "") {
      let parsedArray = [];
      let inputBrackets = { start: "", end: "" };

      // Define the separator for integers
      const separator = intSeparatorNew.trim() || /,|\n/.source; // Use comma or newline if no separator is specified

      if (intInputType === "integers") {
        // For integers
        parsedArray = inputIntegersNew
          .split(new RegExp(separator))
          .map((str) => str.trim()) // Trim whitespace from each part
          .filter((str) => str !== "") // Remove empty strings
          .map(Number)
          .filter((n) => !isNaN(n));

        sortedIntegers = parsedArray
          .sort((a, b) => {
            if (sortingOrderNew === "ascending") return a - b;
            if (sortingOrderNew === "descending") return b - a;
            return Math.random() - 0.5; // Random sorting
          })
          .join(intSeparatorNew.trim() || ",");
      } else if (intInputType === "array") {
        // Detect the type of brackets used in the input
        const bracketMatch = inputIntegersNew.match(/[\[\]\{\}\(\)]/g) || [];
        if (bracketMatch.length > 0) {
          inputBrackets.start = bracketMatch[0];
          inputBrackets.end = bracketMatch[bracketMatch.length - 1];
        }

        // Remove possible brackets and split by common delimiters (comma, space, newline)
        const cleanedInput = inputIntegersNew
          .replace(/[\[\]\{\}\(\)]/g, "")
          .split(new RegExp(separator))
          .map((str) => str.trim()) // Trim whitespace from each part
          .filter((str) => str !== "") // Remove empty strings
          .map(Number)
          .filter((n) => !isNaN(n));

        let sortedArray;
        switch (sortingOrderNew) {
          case "ascending":
            sortedArray = cleanedInput.sort((a, b) => a - b);
            break;
          case "descending":
            sortedArray = cleanedInput.sort((a, b) => b - a);
            break;
          case "random":
            sortedArray = cleanedInput.sort(() => Math.random() - 0.5);
            break;
        }

        if (!inputBrackets.start) {
          // Default is square brackets
          sortedIntegers = `[${sortedArray.join(", ")}]`;
        } else {
          sortedIntegers = `${inputBrackets.start}${sortedArray.join(intSeparatorNew + " ")}${inputBrackets.end}`;
        }
      }
    } else {
      // when no input is provided
      sortedIntegers = "";
    }
  }

  // Variables for Integer Extractor
  let inputData = "";
  let extractedInt = "";
  let extractType = "positive";
  let extractedIntSeparator = ",";
  let sortingOrderExtract = "ascending";

  $: {
    if (inputData) {
      // Extract integers from the input data
      const integerPattern = /-?\d+/g;
      let integers = (inputData.match(integerPattern) || []).map(Number); // Ensure integers is always an array

      // Filter integers based on the selected extraction type
      if (extractType === "positive") {
        integers = integers.filter((n) => n > 0);
      } else if (extractType === "negative") {
        integers = integers.filter((n) => n < 0);
      }

      // If no integers match the selected type, clear the result
      if (integers.length === 0) {
        extractedInt = "";
      }

      // Sort integers based on the selected sorting order
      let sortedArray;
      switch (sortingOrderExtract) {
        case "ascending":
          sortedArray = integers.slice().sort((a, b) => a - b); // Use slice() to avoid mutating the original array
          break;
        case "descending":
          sortedArray = integers.slice().sort((a, b) => b - a);
          break;
        case "random":
          sortedArray = integers.slice().sort(() => Math.random() - 0.5);
          break;
      }

      // Format the sorted integers using the specified separator
      extractedInt = sortedArray.join(extractedIntSeparator || ",");
    } else {
      extractedInt = ""; // Clear the result if no input
    }
  }
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
            <span class="text-gray-900 text-base dark:text-white"
              >Mirrored Palindrome</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400"
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
            <span class="text-gray-900 text-base dark:text-white"
              >Centered Palindrome</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400"
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
            <span class="text-gray-900 text-base dark:text-white"
              >Minimal Palindrome</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400"
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
            <h2 class="text-xl font-medium text-gray-700 dark:text-white mb-2">
              Input Integers
            </h2>
            <textarea
              placeholder="Enter Integers"
              rows="8"
              class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={inputText}
            ></textarea>
          </div>

          <div
            class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
          >
            <h2 class="text-xl font-medium text-gray-700 dark:text-white mb-2">
              Palindromic Integers
            </h2>
            <textarea
              placeholder="Result"
              rows="8"
              class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={resultText}
              readonly
            ></textarea>
          </div>
        </div>

        <!-- Buttons -->
        <div
          class="items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 overflow-hidden"
        >
          <div
            class="mt-8 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
          >
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              on:click={() => copyText(resultText)}
            >
              Copy
            </button>
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              on:click={() =>
                downloadText(resultText, "palindromic_output.txt")}
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

  <!-- Integer Array Generator -->
  <div class="tool">
    <h1 class="text-gray-900 text-2xl dark:text-white ml-12 font-medium">
      2. Integer Array Generator
    </h1>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:px-12">
      <div
        class="card p-8 relative items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg"
      >
        <div class="flex gap-8 mb-4">
          <label class="flex flex-col items-center">
            <input
              type="radio"
              name="arrayType"
              value="linear"
              bind:group={arrayType}
              class="mr-2"
            />
            <span class="text-gray-900 text-sm dark:text-white"
              >Linear Array</span
            >
            <div class="flex gap-4 mt-2">
              <div class="flex flex-col items-center">
                <label
                  for="startValue"
                  class="text-sm text-gray-500 dark:text-gray-400"
                  >Start value</label
                >
                <input
                  type="number"
                  id="startValue"
                  bind:value={startValue}
                  class="h-8 w-24 p-2"
                />
              </div>
              <div class="flex flex-col items-center">
                <label
                  for="stepValue"
                  class="text-sm text-gray-500 dark:text-gray-400"
                  >Step value</label
                >
                <input
                  type="number"
                  id="stepValue"
                  bind:value={stepValue}
                  class="h-8 w-24 p-2"
                />
              </div>
            </div>
            <div class="flex flex-col items-center mt-4 col-span-2">
              <label
                for="lengthValue"
                class="text-sm text-gray-500 dark:text-gray-400"
                >Length of the linear Array</label
              >
              <input
                type="number"
                id="lengthValue"
                bind:value={lengthValue}
                class="h-8 w-52 p-2"
              />
            </div>
          </label>

          <label class="flex flex-col items-center">
            <input
              type="radio"
              name="arrayType"
              value="random"
              bind:group={arrayType}
              class="mr-2"
            />
            <span class="text-gray-900 text-sm dark:text-white"
              >Random Array</span
            >
            <div class="flex gap-4 mt-2">
              <div class="flex flex-col items-center">
                <label
                  for="rangeStartValue"
                  class="text-sm text-gray-500 dark:text-gray-400"
                  >Range start</label
                >
                <input
                  type="number"
                  id="rangeStartValue"
                  bind:value={rangeStartValue}
                  class="h-8 w-24 p-2"
                />
              </div>
              <div class="flex flex-col items-center">
                <label
                  for="rangeEndValue"
                  class="text-sm text-gray-500 dark:text-gray-400"
                  >Range end</label
                >
                <input
                  type="number"
                  id="rangeEndValue"
                  bind:value={rangeEndValue}
                  class="h-8 w-24 p-2"
                />
              </div>
            </div>
            <div class="flex flex-col items-center mt-4 col-span-2">
              <label
                for="randomLengthValue"
                class="text-xs text-gray-500 dark:text-gray-400"
                >Length of the random Array</label
              >
              <input
                type="number"
                id="randomLengthValue"
                bind:value={randomLengthValue}
                class="h-8 w-52 p-2"
              />
            </div>
          </label>

          <div class="flex flex-col items-center mt-4 col-span-2">
            <label
              for="parenthesesType"
              class="text-sm text-gray-500 dark:text-gray-400"
              >Select Parentheses Type</label
            >
            <select
              id="parenthesesType"
              bind:value={parenthesesType}
              class="h-18 w-52 p-2 text-sm"
            >
              <option value="curly">&#123; &#125;</option>
              <option value="square" selected>&#91; &#93;</option>
              <option value="round">&#40; &#41;</option>
            </select>
          </div>
        </div>

        <div
          class="mt-4 gap-4 items-center mx-auto max-w-screen-xl overflow-hidden"
        >
          <div
            class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
          >
            <h2
              class="text-base font-medium text-gray-700 dark:text-white mb-2"
            >
              Integer Array
            </h2>
            <textarea
              placeholder="Generated Array"
              rows="5 "
              class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={integerArray}
              readonly
            ></textarea>
          </div>
        </div>

        <!-- Buttons -->
        <div
          class="items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 overflow-hidden"
        >
          <div
            class="mt-8 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
          >
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              on:click={() => copyText(integerArray)}
            >
              Copy
            </button>
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              on:click={() =>
                downloadText(integerArray, "integer_array_output.txt")}
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

  <!-- Integer Adder -->
  <div class="tool">
    <h1 class="text-gray-900 text-2xl dark:text-white ml-12 font-medium">
      3. Integer Adder
    </h1>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:px-12">
      <div
        class="card p-8 relative items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg"
      >
        <div class="flex gap-8 mb-4">
          <div class="flex flex-col items-center col-span-2">
            <label
              for="intSeparator"
              class="text-lg text-gray-3 00 dark:text-gray-100"
              >Separator for integer input:</label
            >
            <input
              type="text"
              id="intSeparator"
              bind:value={intSeparator}
              class="h-8 w-52 p-2 text-base"
              maxlength="1"
            />
          </div>
          <!-- 
          <div
            class="mt-4 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
          > -->
          <label
            class="ml-20 text-base text-gray-500 dark:text-gray-100 flex items-center"
          >
            <input type="radio" bind:group={showPartialSums} value={true} />
            Show Partial Sums
          </label>
          <label
            class="text-base text-gray-500 dark:text-gray-100 flex items-center"
          >
            <input type="radio" bind:group={showPartialSums} value={false} />
            Show Total Sum
          </label>
          <!-- </div> -->
          <label
            class="text-base text-gray-500 dark:text-gray-100 flex items-center"
          >
            <input type="checkbox" bind:checked={showSumTerms} />
            Show Sum Terms
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
              class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={inputIntegers}
            ></textarea>
          </div>

          <div
            class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
          >
            <h2 class="text-lg font-medium text-gray-700 dark:text-white mb-2">
              Sum
            </h2>
            <textarea
              placeholder="Result"
              rows="8"
              class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={integerSum}
              readonly
            ></textarea>
          </div>
        </div>

        <!-- Buttons -->
        <div
          class="items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 overflow-hidden"
        >
          <div
            class="mt-8 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
          >
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              on:click={() => copyText(integerSum)}
            >
              Copy
            </button>
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              on:click={() => downloadText(integerSum, "int_sum_output.txt")}
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

<!-- Integer / Integer Array Sorter -->
<div class="tool">
  <h1 class="text-gray-900 text-2xl dark:text-white ml-12 font-medium">
    4. Integer / Integer Array Sorter
  </h1>
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:px-12">
    <div
      class="card p-8 relative items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg"
    >
      <div class="flex gap-8 mb-4">
        <div class="flex flex-col items-center col-span-2">
          <label
            for="intSeparatorNew"
            class="text-lg text-black-100 dark:text-gray-100"
            >Separator for integer input:</label
          >
          <input
            type="text"
            id="intSeparatorNew"
            class="h-8 w-52 p-2 text-base"
            maxlength="1"
            bind:value={intSeparatorNew}
          />
        </div>

        <div class="flex flex-col items-center col-span-2">
          <label
            for="inputTypeNew"
            class="text-lg text-black-300 dark:text-gray-100">Input Type:</label
          >
          <div class="flex gap-4">
            <label
              class="text-base text-gray-500 dark:text-gray-100 flex items-center"
            >
              <input
                type="radio"
                value="integers"
                bind:group={intInputType}
                checked={intInputType === "integers"}
              />
              Integers
            </label>
            <label
              class="text-base text-gray-500 dark:text-gray-100 flex items-center"
            >
              <input
                type="radio"
                value="array"
                bind:group={intInputType}
                checked={intInputType === "array"}
              />
              Integer Array
            </label>
          </div>
        </div>

        <div class="flex flex-col items-center col-span-2">
          <label
            for="sortingOrderNew"
            class="text-base text-black-300 dark:text-gray-100"
            >Sorting Order:</label
          >
          <select
            id="sortingOrderNew"
            class="h-18 w-52 p-2 text-base"
            bind:value={sortingOrderNew}
          >
            <option value="ascending" selected>Ascending</option>
            <option value="descending">Descending</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>

      <div
        class="mt-4 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
      >
        <div
          class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
        >
          <h2 class="text-xl font-medium text-gray-700 dark:text-white mb-2">
            Input Integers
          </h2>
          <textarea
            placeholder="Enter Integers"
            rows="8"
            class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            bind:value={inputIntegersNew}
          ></textarea>
        </div>

        <div
          class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
        >
          <h2 class="text-xl font-medium text-gray-700 dark:text-white mb-2">
            Sorted Integers
          </h2>
          <textarea
            placeholder="Result"
            rows="8"
            class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            bind:value={sortedIntegers}
            readonly
          ></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div
        class="items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 overflow-hidden"
      >
        <div
          class="mt-8 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
        >
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            on:click={() => copyText(sortedIntegers)}
          >
            Copy
          </button>
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            on:click={() =>
              downloadText(sortedIntegers, "sorted_int_output.txt")}
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

<!-- Integer Extractor -->
<div class="tool">
  <h1 class="text-gray-900 text-2xl dark:text-white ml-12 font-medium">
    5. Integer Extractor
  </h1>
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:px-12">
    <div
      class="card p-8 relative items-center mx-auto max-w-screen-xl overflow-hidden rounded-lg"
    >
      <div class="flex gap-8 mb-4">
        <div class="flex flex-col items-center col-span-2">
          <label
            for="intSeparatorNew"
            class="text-lg text-black-100 dark:text-gray-100"
            >Separator for extracted integer:</label
          >
          <input
            type="text"
            id="intSeparatorNew"
            class="h-8 w-52 p-2 text-base"
            maxlength="1"
            bind:value={extractedIntSeparator}
          />
        </div>

        <div class="flex flex-col items-center col-span-2">
          <label
            for="inputTypeNew"
            class="text-lg text-black-300 dark:text-gray-100"
            >Extraction Type:</label
          >
          <div class="flex gap-4">
            <label
              class="text-base text-gray-500 dark:text-gray-100 flex items-center"
            >
              <input
                type="radio"
                value="positive"
                bind:group={extractType}
                checked={extractType === "positive"}
              />
              Extract +ve Integers
            </label>
            <label
              class="text-base text-gray-500 dark:text-gray-100 flex items-center"
            >
              <input
                type="radio"
                value="negative"
                bind:group={extractType}
                checked={extractType === "negative"}
              />
              Extract -ve Integers
            </label>
          </div>
        </div>

        <div class="flex flex-col items-center col-span-2">
          <label
            for="sortingOrderNew"
            class="text-base text-black-300 dark:text-gray-100"
            >Sorting Order:</label
          >
          <select
            id="sortingOrderNew"
            class="h-18 w-52 p-2 text-base"
            bind:value={sortingOrderExtract}
          >
            <option value="ascending" selected>Ascending</option>
            <option value="descending">Descending</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>

      <!-- textareas -->
      <div
        class="mt-4 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
      >
        <div
          class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
        >
          <h2 class="text-xl font-medium text-gray-700 dark:text-white mb-2">
            Input the Data containing Integers
          </h2>
          <textarea
            placeholder="Enter Integers"
            rows="8"
            class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            bind:value={inputData}
          ></textarea>
        </div>

        <div
          class="rounded-lg overflow-hidden bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-4"
        >
          <h2 class="text-xl font-medium text-gray-700 dark:text-white mb-2">
            Extracted Integers
          </h2>
          <textarea
            placeholder="Result"
            rows="8"
            class="resize-none block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            bind:value={extractedInt}
            readonly
          ></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div
        class="items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 overflow-hidden"
      >
        <div
          class="mt-8 gap-4 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden"
        >
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            on:click={() => copyText(extractedInt)}
          >
            Copy
          </button>
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            on:click={() =>
              downloadText(extractedInt, "extracted_int_output.txt")}
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

<style>
  .card h2 {
    padding: 0.5rem 0;
  }
</style>
