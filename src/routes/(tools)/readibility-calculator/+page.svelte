<script>
 let text = '';
 let readabilityIndices = {
   colemanLiau: 0,
   fleschKincaid: 0,
   ari: 0,
   smog: 0
 };
 let textStatistics = {
   characterCount: 0,
   wordCount: 0,
   sentenceCount: 0,
   charactersPerWord: 0,
   syllablesPerWord: 0,
   wordsPerSentence: 0
 };
  
 function calculateReadability() {
   // Calculate readability indices
   readabilityIndices.colemanLiau = calculateColemanLiauIndex(text);
   readabilityIndices.fleschKincaid = calculateFleschKincaidIndex(text);
   readabilityIndices.ari = calculateARI(text);
   readabilityIndices.smog = calculateSMOGIndex(text);
  
   // Calculate text statistics
   textStatistics.characterCount = countCharacters(text);
   textStatistics.wordCount = countWords(text);
   textStatistics.sentenceCount = countSentences(text);
   textStatistics.charactersPerWord = calculateCharactersPerWord(text);
   textStatistics.syllablesPerWord = calculateSyllablesPerWord(text);
   textStatistics.wordsPerSentence = calculateWordsPerSentence(text);
 }
  
 // function calculateColemanLiauIndex(text) {
 // // Implementation of Coleman-Liau Index formula
 // }

 function calculateColemanLiauIndex(text) {
  let letters = 0;
  let sentences = 0;
  let words = 0;

  // Count letters, sentences, and words
  text.split('').forEach((char) => {
    if (char.match(/[a-zA-Z]/)) {
      letters++;
    }
  });
  sentences = text.split(/[.!?]/).length;
  words = text.split(' ').length;

  // Calculate Coleman-Liau Index
  let L = (letters / words) * 100;
  let S = (sentences / words) * 100;
  let grade = Math.round(0.0588 * L - 0.296 * S - 15.8);

  return grade;
}


 function calculateFleschKincaidIndex(text) {
  let words = 0;
  let sentences = 0;
  let syllables = 0;

  // Count words and sentences
  words = text.split(' ').length;
  sentences = text.split(/[.!?]/).length;

  // Count syllables
  text.split(' ').forEach((word) => {
    syllables += countSyllables(word);
  });

  // Calculate Flesch-Kincaid Grade Level
  let grade = (0.39 * (words / sentences)) + (0.11 * (syllables / words));
  grade = Math.round(grade);

  return grade;
}

function countSyllables(word) {
  let syllables = 0;
  let vowels = 'aeiouy';

  // Remove non-word characters
  word = word.replace(/[^a-zA-Z]/g, '');

  // Count syllables
  for (let i = 0; i < word.length; i++) {
    if (vowels.indexOf(word[i].toLowerCase()) !== -1) {
      syllables++;
    }
  }

  // Adjust for special cases
  if (word.endsWith('le')) {
    syllables--;
  }
  if (word.endsWith('les')) {
    syllables--;
  }

  return syllables;
}
  

 function calculateARI(text) {
  let characters = 0;
  let words = 0;
  let sentences = 0;

  // Count characters, words, and sentences
  characters = text.length;
  words = text.split(' ').length;
  sentences = text.split(/[.!?]/).length;

  // Calculate Automated Readability Index
  let grade = (4.71 * (characters / words)) + (0.5 * (words / sentences)) - 21.43;
  grade = Math.round(grade);

  return grade;
}

// Implementation of SMOG Index formula
  
 function calculateSMOGIndex(text) {
  let sentences = 0;
  let polysyllables = 0;

  // Count sentences
  sentences = text.split(/[.!?]/).length;

  // Count polysyllables
  text.split(' ').forEach((word) => {
    if (countSyllables(word) > 2) {
      polysyllables++;
    }
  });

  // Calculate SMOG Index
  let grade = (1.043 * Math.sqrt(polysyllables * (30 / sentences))) + 3.1291;
  grade = Math.round(grade);

  return grade;
}

 function countCharacters(text) {
  return text.length;
}

 function countWords(text) {
  return text.split(' ').length;
}

function countSentences(text) {
  return text.split(/[.!?]/).length;
}

function calculateCharactersPerWord(text) {
  let characters = 0;
  let words = 0;

  characters = text.length;
  words = text.split(' ').length;

  return characters / words;
}

function calculateSyllablesPerWord(text) {
  let syllables = 0;
  let words = 0;

  text.split(' ').forEach((word) => {
    syllables += countSyllables(word);
  });
  words = text.split(' ').length;

  return syllables / words;
}

function calculateWordsPerSentence(text) {
  let words = 0;
  let sentences = 0;

  words = text.split(' ').length;
  sentences = text.split(/[.!?]/).length;
  return words / sentences;
}


  function handleTextChange(event) {
    text = event.target.value;
    calculateReadability();
  }

  function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      text = reader.result;
      calculateReadability();
    };
    reader.readAsText(file);
  }
</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg ">
 <!-- Add tool here -->
<main class=" text-white container mx-auto p-4 pt-6 md:p-6 lg:p-12 ">
  <!-- <h1 class="text-3xl font-bold mb-4">Readability Calculator</h1> -->
  <form>
    <label for="text" class="block mb-2">Enter text or upload a file:</label>
    <textarea id="text" class="w-full p-2 mb-4 text-black" bind:value={text} on:input={handleTextChange}></textarea>
    <input type="file" id="file" class="w-full p-2 mb-4" on:input={handleFileInput}>
    <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" on:click={calculateReadability}>Calculate Readability</button>
  </form>

  <section class="mt-6">
    <h2 class="text-2xl font-bold mb-2">Readability Indices:</h2>
    <ul class="list-none mb-4">
      <li class="mb-2">
        <span class="font-bold">Coleman-Liau Index:</span> {readabilityIndices.colemanLiau}
      </li>
      <li class="mb-2">
        <span class="font-bold">Flesch-Kincaid Grade Level:</span> {readabilityIndices.fleschKincaid}
      </li>
      <li class="mb-2">
        <span class="font-bold">Automated Readability Index (ARI):</span> {readabilityIndices.ari}
      </li>
      <li class="mb-2">
        <span class="font-bold">SMOG Index:</span> {readabilityIndices.smog}
      </li>
    </ul>
  </section>

  <section class="mt-6">
    <h2 class="text-2xl font-bold mb-2">Text Statistics:</h2>
    <ul class="list-none mb-4">
      <li class="mb-2">
        <span class="font-bold">Character Count:</span> {textStatistics.characterCount}
      </li>
      <li class="mb-2">
        <span class="font-bold">Word Count:</span> {textStatistics.wordCount}
      </li>
      <li class="mb-2">
        <span class="font-bold">Sentence Count:</span> {textStatistics.sentenceCount}
      </li>
      <li class="mb-2">
        <span class="font-bold">Characters per Word:</span> {textStatistics.charactersPerWord}
      </li>
      <li class="mb-2">
        <span class="font-bold">Syllables per Word:</span> {textStatistics.syllablesPerWord}
      </li>
      <li class="mb-2">
        <span class="font-bold">Words per Sentence:</span> {textStatistics.wordsPerSentence}
      </li>
    </ul>
  </section>
</main>
</div>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  textarea {
    height: 200px;
  }
</style>
